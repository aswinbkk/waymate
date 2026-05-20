const UserRide = require("../models/userRideModel");
const User = require("../models/userModel")
const geocodeAddress = require("../utils/geocode");
const getRoadDistance = require("../utils/osrm");
const calculateDistance = require("../utils/calculateDistance");
const { BASE_FARE, PER_KM_RATE, AC_EXTRA_PER_KM } = require("../config/pricingConfig");

// Create user ride.
const createUserRide = async (req, res) => {
    try {
        const {
            originName,
            destinationName,
            date,
            totalSeats,
            pricePerSeat,
            vehicleNumber,
            preferences
        } = req.body;

        if (!originName || !destinationName || !date || !totalSeats || !pricePerSeat || !vehicleNumber) {
            return res.status(400).json({ msg: "Missing required fields" });
        };

        const originCoords = await geocodeAddress(originName);
        const destCoords = await geocodeAddress(destinationName);

        if (!originCoords || !destCoords) {
            return res.status(400).json({ msg: "Invalid location" });
        }

        const origin = { name: originName, coordinates: { lat: originCoords.lat, lng: originCoords.lng } };
        const destination = { name: destinationName, coordinates: { lat: destCoords.lat, lng: destCoords.lng } };

        // Get ROAD distance (OSRM)
        let distanceData = await getRoadDistance(origin.coordinates, destination.coordinates);
        let distance;

        if (distanceData) {
            distance = distanceData.distance;
        } else {
            // fallback if OSRM fails
            distance = calculateDistance(origin.coordinates.lat, origin.coordinates.lng, destination.coordinates.lat, destination.coordinates.lng);
        }

        // Auto price
        let acCharge;
        if (preferences && preferences.ac === true) {
            acCharge = AC_EXTRA_PER_KM;
        } else {
            acCharge = 0;   // no extra charge
        }

        const totalCost = BASE_FARE + distance * (PER_KM_RATE + acCharge);
        const autoPricePerSeat = Math.ceil(totalCost / totalSeats);

        const userRide = await UserRide({
            createdBy: req.auth.id,
            createdByRole: req.auth.role,
            origin: { name: originName, coordinates: originCoords },
            destination: { name: destinationName, coordinates: destCoords },
            date,
            totalSeats,
            availableSeats: totalSeats,
            autoPricePerSeat,
            pricePerSeat,
            vehicleNumber,
            preferences
        });
        await userRide.save();
        res.status(201).json({ success:true, msg: "Ride created", data: userRide });

    } catch (error) {
        console.log(error);
        
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Update user ride.
const updateUserRide = async (req, res) => {
    try {
        const { id } = req.params;
        const userRide = await UserRide.findById(id);

        if (!userRide) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        // Owner check
        if (!userRide.createdBy.equals(req.auth.id)) {
            return res.status(403).json({ msg: "Not authorized to update this ride" });
        }

        const {
            originName,
            destinationName,
            date,
            totalSeats,
            pricePerSeat,
            vehicleNumber,
            preferences
        } = req.body;

        // Update origin
        if (originName) {
            const originCoords = await geocodeAddress(originName);

            if (!originCoords) {
                return res.status(400).json({ msg: "Invalid origin location" });
            }
            userRide.origin = { name: originName, coordinates: originCoords };
        }

        // Update destination
        if (destinationName) {
            const destCoords = await geocodeAddress(destinationName);

            if (!destCoords) {
                return res.status(400).json({ msg: "Invalid destination location" });
            }
            userRide.destination = { name: destinationName, coordinates: destCoords };
        }

        // Update date
        if (date) {
            userRide.date = new Date(date);
        }

        // Update seats
        if (totalSeats) {
            // prevent reducing below booked seats
            const bookedSeats = userRide.totalSeats - userRide.availableSeats;

            if (totalSeats < bookedSeats) {
                return res.status(400).json({ msg: `Minimum seats must be ${bookedSeats}` });
            }
            userRide.availableSeats = totalSeats - bookedSeats;
            userRide.totalSeats = totalSeats;
        }

        // Update price
        if (pricePerSeat) {
            userRide.pricePerSeat = pricePerSeat;
        }

        // Vehicle number
        if (vehicleNumber) {
            userRide.vehicleNumber = vehicleNumber;
        }

        // Preferences
        if (preferences) {
            userRide.preferences = preferences;
        }

        // Recalculate distance
        let distanceData = await getRoadDistance(userRide.origin.coordinates, userRide.destination.coordinates);

        let distance;
        if (distanceData) {
            distance = distanceData.distance;
        } else {
            // fallback if OSRM fails
            distance = calculateDistance(userRide.origin.coordinates.lat, userRide.origin.coordinates.lng, userRide.destination.coordinates.lat, userRide.destination.coordinates.lng);
        }
        userRide.distance = distance;

        // Auto price recalc
        let acCharge;
        if (preferences && preferences.ac === true) {
            acCharge = AC_EXTRA_PER_KM;
        } else {
            acCharge = 0;   // no extra charge
        }

        const totalCost = BASE_FARE + distance * (PER_KM_RATE + acCharge);
        userRide.autoPricePerSeat = Math.ceil(totalCost / userRide.totalSeats);
        await userRide.save();
        res.status(200).json({ success:true, msg: "Ride updated successfully", data: userRide });

    } catch (error) {
        res.status(500).json({ msg: `Server error, ${error.message}` });
    }
};

// Delete user ride.
const deleteUserRide = async (req, res) => {
    try {
        const { id } = req.params;
        const userRide = await UserRide.findOneAndDelete({ _id: id, createdBy: req.auth.id });

        if (!userRide) {
            return res.status(404).json({ msg: "Ride not found or unauthorized" });
        }
        res.status(200).json({ success:true, msg: "Ride deleted successfully" });

    } catch (error) {
        res.status(500).json({ msg: `Server error, ${error}` });

    }
};

// Add passenger to user ride (creator only).
const addPassenger = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const userRide = await UserRide.findById(id);

        if (!userRide) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        if (!userRide.createdBy.equals(req.auth.id)) {
            return res.status(403).json({ msg: "Not authorized" });
        }

        if (userRide.createdBy.equals(userId)) {
            return res.status(400).json({ msg: "Creator is already part of ride" });
        }

        const passenger = await User.findById(userId);
        if (!passenger) {
            return res.status(404).json({ msg: "Passenger not found" });
        }

        const exists = userRide.passengers.find(variable => variable.user.equals(userId));
        if (exists) {
            return res.status(400).json({ msg: "User already in ride" });
        }

        if (userRide.availableSeats <= 0) {
            return res.status(409).json({ msg: "No seats available" });
        }

        userRide.passengers.push({ user: userId });
        userRide.availableSeats = userRide.availableSeats - 1;

        if (userRide.availableSeats === 0) {
            userRide.status = "full";
        }
        await userRide.save();
        res.status(200).json({ success:true, msg: "Passenger added", data: userRide });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Remove passenger from user ride (creator only).
const removePassenger = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const userRide = await UserRide.findById(id);

        if (!userRide) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        if (!userRide.createdBy.equals(req.auth.id)) {
            return res.status(403).json({ msg: "Not authorized" });
        }

        const index = userRide.passengers.findIndex(variable => variable.user.equals(userId));
        if (index === -1) {
            return res.status(400).json({ msg: "User not in ride" });
        }

        // Remove passenger
        userRide.passengers.splice(index, 1);
        userRide.availableSeats = userRide.availableSeats + 1;

        if (userRide.status === "full") {
            userRide.status = "open";
        }
        await userRide.save();
        res.status(200).json({ success:true, msg: "Passenger removed", data: userRide });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Join a ride.
const userJoinRide = async (req, res) => {
    try {
        const { id } = req.params;
        const userRide = await UserRide.findById(id);

        if (!userRide) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        if (userRide.createdBy.equals(req.auth.id)) {
            return res.status(400).json({ msg: "It's your own ride" });
        }

        if (userRide.status !== "open") {
            return res.status(400).json({ msg: "Ride not open" });
        }

        if (userRide.availableSeats <= 0) {
            return res.status(400).json({ msg: "No seats available" });
        }

        const existing = userRide.passengers.find(variable => variable.user.equals(req.auth.id));
        if (existing) {
            return res.status(400).json({ msg: "Already joined this ride" });
        }
        //add passenger
        userRide.passengers.push({ user: req.auth.id });
        userRide.availableSeats = userRide.availableSeats - 1;

        //update status
        if (userRide.availableSeats === 0) {
            userRide.status = "full";
        }

        await userRide.save();
        res.status(201).json({ success:true, msg: "Joined ride successfully", data: userRide });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Leave from ride.
const userleaveRide = async (req, res) => {
    try {
        const { id } = req.params;
        const userRide = await UserRide.findById(id);

        if (!userRide) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        const passengerIndex = userRide.passengers.findIndex(variable => variable.user.equals(req.auth.id));

        if (passengerIndex === -1) {
            return res.status(400).json({ msg: "You are not in this ride" });
        }

        // Remove passenger
        userRide.passengers.splice(passengerIndex, 1);
        userRide.availableSeats = userRide.availableSeats + 1;

        // Reopen ride
        if (userRide.status === "full") {
            userRide.status = "open";
        };

        await userRide.save();
        res.status(201).json({ success:true, msg: "Left ride successfully", data: userRide });
    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// User dashboard summary.
const userDashboard = async (req, res) => {
    try {
        const userCreatedRides = await UserRide.countDocuments({ createdBy: req.auth.id });
        const userJoinedRides = await UserRide.countDocuments({ "passengers.user": req.auth.id });
        res.status(200).json({ success:true, userCreatedRides, userJoinedRides });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// View user created rides.
const viewUserCreatedRides = async (req, res) => {
    try {
        const userCreatedRides = await UserRide.find({ createdBy: req.auth.id }).sort({ createdAt: -1 });
        res.status(200).json({ success:true, count: userCreatedRides.length, data: userCreatedRides });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// View user joined rides.
const viewUserJoinedRides = async (req, res) => {
    try {
        const userJoinedRides = await UserRide.find({ "passengers.user": req.auth.id })
        res.status(200).json({ success:true, count: userJoinedRides.length, data: userJoinedRides });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Search user ride.
const searchUserRides = async (req, res) => {
    try {
        const {
            originName,
            destinationName,
            range = 1,
            status = "open"
        } = req.body;

        if (originName && destinationName) {
            const originCoords = await geocodeAddress(originName);
            const destCoords = await geocodeAddress(destinationName);

            if (!originCoords || !destCoords) {
                return res.status(400).json({
                    msg: "Invalid or unrecognized location. Please enter a valid place."
                });
            }

            const originLat = originCoords.lat;
            const originLng = originCoords.lng;
            const destLat = destCoords.lat;
            const destLng = destCoords.lng;
            // Approx: 1 degree ≈ 111 km
            const radius = range / 111;

            const userRide = await UserRide.find({
                // Origin match
                "origin.coordinates.lat": { $gte: originLat - radius, $lte: originLat + radius },
                "origin.coordinates.lng": { $gte: originLng - radius, $lte: originLng + radius },
                // Destination match
                "destination.coordinates.lat": { $gte: destLat - radius, $lte: destLat + radius },
                "destination.coordinates.lng": { $gte: destLng - radius, $lte: destLng + radius },
                status: status
            });
            res.status(200).json({ msg: "Matching rides found", count: userRide.length, data: userRide });

        } else {
            // view all user ride
            const allUserRide = await UserRide.find({ status: status }).sort({ createdAt: -1 })
            res.status(200).json({ msg: "All ride", count: allUserRide.length, data: allUserRide });
        }

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

const getUserRide = async (req, res) => {
    try {
        const allUserRide = await UserRide.find().sort({ createdAt: -1 });

        const formattedRides = allUserRide.map((ride) => ({
            id: ride._id,
            origin: ride.origin.name,
            destination: ride.destination.name,
            date: ride.date,
            availableSeats: ride.availableSeats,
            totalSeats: ride.totalSeats,
            status: ride.status,
            preferences: {
                gender: ride.preferences.gender,
                ac: ride.preferences.ac
            },
            pricePerSeat: ride.pricePerSeat
        }));

        res.status(200).json({
            msg: "User Created Rides",
            count: formattedRides.length,
            data: formattedRides
        });

    } catch (error) {
        res.status(500).json({
            msg: `Server Error ${error.message}`
        });
    }
};

module.exports = {
    createUserRide,
    updateUserRide,
    deleteUserRide,
    addPassenger,
    removePassenger,
    userJoinRide,
    userleaveRide,
    userDashboard,
    viewUserCreatedRides,
    viewUserJoinedRides,
    searchUserRides,
    getUserRide
};