const Ride = require("../models/rideModel");

// create ride (User or Agency)
const createRide = async (req, res) => {
    try {
        const {
            pickup,
            destination,
            date,
            totalSeats,
            pricePerSeat,
            vehicleNumber,
            preferences
        } = req.body;


        if (!pickup || !destination || !date || !totalSeats || !pricePerSeat || !vehicleNumber) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const ride = await Ride.create({
            createdBy: req.user.id,
            createdByRole: req.user.role,
            pickup,
            destination,
            date,
            totalSeats,
            availableSeats: totalSeats,
            pricePerSeat,
            vehicleNumber,
            preferences
        });
        res.status(201).json({ msg: "Ride created successfully", data: ride });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// join ride
const joinRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await Ride.findById(id);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        //ride not open
        if (ride.status !== "open") {
            return res.status(400).json({ message: "Ride not available" });
        }

        //no seats
        if (ride.availableSeats <= 0) {
            return res.status(400).json({ message: "No seats available" });
        }

        //already joined
        // const existing = ride.passengers.find(p => p.user.equals(req.user._id));
        // if (existing) {
        //     return res.status(400).json({ message: "Already joined this ride" });
        // }

        //add passenger
        ride.passengers.push({
            user: req.user._id
        });
        ride.availableSeats -= 1;

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

//get all ride
const getAllRides = async (req, res) => {
    try {
        const getData = await Ride.find().sort({ createdAt: -1 });
        res.status(200).json({ msg: "all ride", data: getData });
    } catch (error) {
        res.status(500).json({ msg: "server error" });
    }
};

const updateRide = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = await Ride.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
        if (!updateData) {
            return res.status(404).json({ msg: "ride not fonud" });
        }
        res.status(200).json({ msg: "ride updated", updateddata: updateData });
    } catch (error) {
        res.status(500).json({ msg: "server error" });
    }
};

const deleteRide = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteData = await Ride.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ msg: "ride not fonud" });
        }
        res.status(200).json({ msg: "ride deleted" });
    } catch (error) {
        res.status(500).json({ msg: "server error" });
    }
};

module.exports = {
    createRide,
    joinRide,
    getAllRides,
    updateRide,
    deleteRide
};