const Ride = require("../models/rideModel");
const geocodeAddress = require("../utils/geocode");

// Create ride (User or Agency).
const createRide = async (req, res) => {
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

        const ride = await Ride({
            createdBy: req.user.id,
            createdByRole: req.user.role,
            origin: { name: originName, coordinates: originCoords },
            destination: { name: destinationName, coordinates: destCoords },
            date,
            totalSeats,
            availableSeats: totalSeats,
            pricePerSeat,
            vehicleNumber,
            preferences
        });
        await ride.save();
        res.status(201).json({ msg: "Ride created", data: ride });
    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Get near by rides by coordinates matching.
const getNearbyRides = async (req, res) => {
    try {
        const {
            originName,
            destinationName,
            range = 1
        } = req.body;

        if (!originName || !destinationName) {
            return res.status(400).json({ msg: "Origin and destination are required" });
        };

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

        const rides = await Ride.find({
            // Origin match
            "origin.coordinates.lat": { $gte: originLat - radius, $lte: originLat + radius },
            "origin.coordinates.lng": { $gte: originLng - radius, $lte: originLng + radius },
            // Destination match
            "destination.coordinates.lat": { $gte: destLat - radius, $lte: destLat + radius },
            "destination.coordinates.lng": { $gte: destLng - radius, $lte: destLng + radius },

            status: "open"
        })
            .populate("createdBy", "name email role").populate("passengers.user", "name");

        res.status(200).json({ msg: "Matching rides found", count: rides.length, data: rides });
    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Join ride
const joinRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await Ride.findById(id);

        if (!ride) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        if (ride.createdBy.equals(req.user.id)) {
            return res.status(400).json({ msg: "It's your own ride" });
        }

        if (ride.status !== "open") {
            return res.status(400).json({ msg: "Ride not open" });
        }

        if (ride.availableSeats <= 0) {
            return res.status(400).json({ msg: "No seats available" });
        }

        const existing = ride.passengers.find(params => params.user.equals(req.user.id));
        if (existing) {
            return res.status(400).json({ msg: "Already joined this ride" });
        }
        //add passenger
        ride.passengers.push({ user: req.user.id });
        ride.availableSeats = ride.availableSeats - 1;

        //update status
        if (ride.availableSeats === 0) {
            ride.status = "full";
        }

        await ride.save();
        res.status(201).json({ msg: "Joined ride successfully", data: ride });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Leave ride
const leaveRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await Ride.findById(id);

        if (!ride) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        const passengerIndex = ride.passengers.findIndex(params => params.user.equals(req.user.id));

        if (passengerIndex === -1) {
            return res.status(400).json({ msg: "You are not in this ride" });
        }

        // Remove passenger
        ride.passengers.splice(passengerIndex, 1);
        ride.availableSeats = ride.availableSeats + 1;

        // Reopen ride
        if (ride.status === "full") {
            ride.status = "open";
        };

        await ride.save();
        res.status(201).json({ msg: "Left ride successfully", data: ride });
    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Get all ride
const getAllRides = async (req, res) => {
    try {
        const getData = await Ride.find().sort({ createdAt: -1 });
        res.status(200).json({ msg: "All ride", data: getData });
    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Update ride
const updateRide = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = await Ride.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
        if (!updateData) {
            return res.status(404).json({ msg: "Ride not fonud" });
        }
        res.status(200).json({ msg: "Ride updated", data: updateData });
    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Delete ride
const deleteRide = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteData = await Ride.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ msg: "ride not fonud" });
        }
        res.status(200).json({ msg: "Ride deleted" });
    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

module.exports = {
    createRide,
    getNearbyRides,
    joinRide,
    leaveRide,
    getAllRides,
    updateRide,
    deleteRide
};