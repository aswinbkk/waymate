const Ride = require('../models/rideModel');

const createRide = async (req, res) => {
    const { user, pickup, destination, fare, vehicle } = req.body;

    if (!user || !pickup || !destination || !fare || !vehicle) {
        return res.status(400).json({ msg: "Required fields missing" });
    }

    try {
        const ride = await Ride.create({
            user,
            pickup,
            destination,
            fare,
            vehicle
        });

        res.status(201).json({
            msg: "Ride created successfully",
            data: ride,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

const getAllRides = async (req, res) => {
    try {
        const rides = await Ride.find()
            .populate('user', 'fullname email')
            .populate('agency', 'agencyname email');

        res.status(200).json(rides);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

const getUserRides = async (req, res) => {
    const { userId } = req.params;

    try {
        const rides = await Ride.find({ user: userId });

        res.status(200).json(rides);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

const acceptRide = async (req, res) => {
    const { rideId } = req.params;
    const { agencyId } = req.body;

    try {
        const ride = await Ride.findByIdAndUpdate(
            rideId,
            {
                agency: agencyId,
                status: "accepted"
            },
            { new: true }
        );

        res.status(200).json({
            msg: "Ride accepted",
            data: ride
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

const updateRideStatus = async (req, res) => {
    const { rideId } = req.params;
    const { status } = req.body;

    try {
        const ride = await Ride.findByIdAndUpdate(
            rideId,
            { status },
            { new: true }
        );

        res.status(200).json({
            msg: "Ride status updated",
            data: ride
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    createRide,
    getAllRides,
    getUserRides,
    acceptRide,
    updateRideStatus
};