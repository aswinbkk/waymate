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

const getAllRides = async (req,res) => {
    try {
        const getData = await Ride.find().sort({createdAt: -1});
        res.status(200).json({msg:"all ride", data:getData});
    } catch (error) {
        res.status(500).json({msg:"server error"});
    }
};

const updateRide = async (req,res) => {
    try {
        const {id} = req.params;
        const updateData = await post.findByIdAndUpdate(id,req.body, {returnDocument: 'after'});
        if (!updateData) {
            return res.status(404).json({msg: "post not fonud"});
        }
        res.status(200).json({msg:"post updated", updateddata:updateData});
    } catch (error) {
        res.status(500).json({msg:"server error"});
    }
};

const deleteRide = async (req,res) => {
    try {
        const {id} = req.params;
        const deleteData = await post.findByIdAndDelete(id);
        if (!deleteData) {
           return res.status(404).json({msg:"post not fonud"});
        }
        res.status(200).json({msg:"post deleted"});
    } catch (error) {
        res.status(500).json({msg:"server error"});
    }
};

module.exports = {
    createRide,
    getAllRides,
    updateRide,
    deleteRide
};