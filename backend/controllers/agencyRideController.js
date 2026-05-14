const AgencyRide = require("../models/agencyRideModel");
const User = require("../models/userModel")
const geocodeAddress = require("../utils/geocode");
const getRoadDistance = require("../utils/osrm");
const calculateDistance = require("../utils/calculateDistance");
const { BASE_FARE, PER_KM_RATE, AC_EXTRA_PER_KM } = require("../config/pricingConfig");

// Create agency ride.
const createAgencyRide = async (req, res) => {
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

        const agencyRide = await AgencyRide({
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
        await agencyRide.save();
        res.status(201).json({ msg: "Ride created", data: agencyRide });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Update agency ride.
const updateAgencyRide = async (req, res) => {
    try {
        const { id } = req.params;
        const agencyRide = await AgencyRide.findById(id);

        if (!agencyRide) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        // Owner check
        if (!agencyRide.createdBy.equals(req.auth.id)) {
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
            agencyRide.origin = { name: originName, coordinates: originCoords };
        }

        // Update destination
        if (destinationName) {
            const destCoords = await geocodeAddress(destinationName);

            if (!destCoords) {
                return res.status(400).json({ msg: "Invalid destination location" });
            }
            agencyRide.destination = { name: destinationName, coordinates: destCoords };
        }

        // Update date
        if (date) {
            agencyRide.date = new Date(date);
        }

        // Update seats
        if (totalSeats) {
            // prevent reducing below booked seats
            const bookedSeats = agencyRide.totalSeats - agencyRide.availableSeats;

            if (totalSeats < bookedSeats) {
                return res.status(400).json({ msg: `Minimum seats must be ${bookedSeats}` });
            }
            agencyRide.availableSeats = totalSeats - bookedSeats;
            agencyRide.totalSeats = totalSeats;
        }

        // Update price
        if (pricePerSeat) {
            agencyRide.pricePerSeat = pricePerSeat;
        }

        // Vehicle number
        if (vehicleNumber) {
            agencyRide.vehicleNumber = vehicleNumber;
        }

        // Preferences
        if (preferences) {
            agencyRide.preferences = preferences;
        }

        // Recalculate distance
        let distanceData = await getRoadDistance(agencyRide.origin.coordinates, agencyRide.destination.coordinates);

        let distance;
        if (distanceData) {
            distance = distanceData.distance;
        } else {
            // fallback if OSRM fails
            distance = calculateDistance(agencyRide.origin.coordinates.lat, agencyRide.origin.coordinates.lng, agencyRide.destination.coordinates.lat, agencyRide.destination.coordinates.lng);
        }
        agencyRide.distance = distance;

        // Auto price recalc
        let acCharge;
        if (preferences && preferences.ac === true) {
            acCharge = AC_EXTRA_PER_KM;
        } else {
            acCharge = 0;   // no extra charge
        }

        const totalCost = BASE_FARE + distance * (PER_KM_RATE + acCharge);
        agencyRide.autoPricePerSeat = Math.ceil(totalCost / agencyRide.totalSeats);
        await agencyRide.save();
        res.status(200).json({ msg: "Ride updated successfully", data: agencyRide });

    } catch (error) {
        res.status(500).json({ msg: `Server error, ${error.message}` });
    }
};

// Delete agency ride.
const deleteAgencyRide = async (req, res) => {
    try {
        const { id } = req.params;
        const agencyRide = await AgencyRide.findOneAndDelete({ _id: id, createdBy: req.auth.id });

        if (!agencyRide) {
            return res.status(404).json({ msg: "Ride not found or unauthorized" });
        }
        res.status(200).json({ msg: "Ride deleted successfully" });

    } catch (error) {
        res.status(500).json({ msg: `Server error, ${error}` });

    }
};

// Add passenger to agency ride (creator only).
const addPassenger = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const agencyRide = await AgencyRide.findById(id);

        if (!agencyRide) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        if (!agencyRide.createdBy.equals(req.auth.id)) {
            return res.status(403).json({ msg: "Not authorized" });
        }

        if (agencyRide.createdBy.equals(userId)) {
            return res.status(400).json({ msg: "Creator is already part of ride" });
        }

        const passenger = await User.findById(userId);
        if (!passenger) {
            return res.status(404).json({ msg: "Passenger not found" });
        }

        const exists = agencyRide.passengers.find(variable => variable.user.equals(userId));
        if (exists) {
            return res.status(400).json({ msg: "User already in ride" });
        }

        if (agencyRide.availableSeats <= 0) {
            return res.status(409).json({ msg: "No seats available" });
        }

        agencyRide.passengers.push({ user: userId });
        agencyRide.availableSeats = agencyRide.availableSeats - 1;

        if (agencyRide.availableSeats === 0) {
            agencyRide.status = "full";
        }
        await agencyRide.save();
        res.status(200).json({ msg: "Passenger added", data: agencyRide });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Remove passenger from agency ride (creator only).
const removePassenger = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const agencyRide = await AgencyRide.findById(id);

        if (!agencyRide) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        if (!agencyRide.createdBy.equals(req.auth.id)) {
            return res.status(403).json({ msg: "Not authorized" });
        }

        const index = agencyRide.passengers.findIndex(variable => variable.user.equals(userId));
        if (index === -1) {
            return res.status(400).json({ msg: "User not in ride" });
        }

        // Remove passenger
        agencyRide.passengers.splice(index, 1);
        agencyRide.availableSeats = agencyRide.availableSeats + 1;

        if (agencyRide.status === "full") {
            agencyRide.status = "open";
        }
        await agencyRide.save();
        res.status(200).json({ msg: "Passenger removed", data: agencyRide });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Agency dashboard summary.
const agencyDashboard = async (req, res) => {
    try {
        const agencyCreatedRides = await AgencyRide.countDocuments({ createdBy: req.auth.id });
        res.status(200).json({ agencyCreatedRides });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// View agency created rides.
const viewAgencyCreatedRides = async (req, res) => {
    try {
        const agencyCreatedRides = await AgencyRide.find({ createdBy: req.auth.id }).sort({ createdAt: -1 });
        res.status(200).json({ count: agencyCreatedRides.length, data: agencyCreatedRides });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Search agency ride.
const searchAgencyRides = async (req, res) => {
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

            const agencyRide = await AgencyRide.find({
                // Origin match
                "origin.coordinates.lat": { $gte: originLat - radius, $lte: originLat + radius },
                "origin.coordinates.lng": { $gte: originLng - radius, $lte: originLng + radius },
                // Destination match
                "destination.coordinates.lat": { $gte: destLat - radius, $lte: destLat + radius },
                "destination.coordinates.lng": { $gte: destLng - radius, $lte: destLng + radius },
                status: status
            });
            res.status(200).json({ msg: "Matching rides found", count: agencyRide.length, data: agencyRide });

        } else {
            // view all agency ride
            const allAgencyRide = await AgencyRide.find({ status: status }).sort({ createdAt: -1 })
            res.status(200).json({ msg: "All ride", count: allAgencyRide.length, data: allAgencyRide });
        }

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

const getAgencyRide = async (req, res)=>{
    try {
        const allAgencyRide = await UserRide.find().sort({ createdAt: -1 })
        res.status(200).json({ msg: "User Created Rides", count: allAgencyRide.length, data: allAgencyRide });
    } catch (error) {
        res.status(500).json({msg:`Server Error ${error}`})
    }
}

module.exports = {
    createAgencyRide,
    updateAgencyRide,
    deleteAgencyRide,
    addPassenger,
    removePassenger,
    agencyDashboard,
    viewAgencyCreatedRides,
    searchAgencyRides,
    getAgencyRide
};