const User = require('../models/userModel');
const Ride = require('../models/rideModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// Register user.
const registerUser = async (req, res) => {
    const { role, fullname, email, password, phone } = req.body;

    if (!role || !fullname.firstname || !email || !password || !phone) {
        return res.status(400).json({ msg: "Required fields missing" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const createdUser = new User({
            role,
            fullname: { firstname: fullname.firstname, lastname: fullname.lastname },
            email,
            password: hashedPassword,
            phone
        });
        await createdUser.save();

        res.status(201).json({
            msg: "User created successfully", data: {
                id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                phone: createdUser.phone
            }
        });

    } catch (error) {
        res.status(500).json({ msg: `Server error ${error}` });
    }
};

// Login user.
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ msg: "No user registered" });
        }
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.SECRET_KEY, { expiresIn: '100h' });
        res.status(200).json({ msg: 'Login successful', token: token });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Dashboard summary
const getDashboard = async (req, res) => {
    try {
        const ridesCreated = await Ride.countDocuments({ createdBy: req.user.id });
        const ridesJoined = await Ride.countDocuments({ "passengers.user": req.user.id });
        res.status(200).json({ ridesCreated, ridesJoined });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Get Profile.
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({ msg: "Profile fetched", data: user });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        delete updates.password;
        const user = await User.findByIdAndUpdate(req.user.id, updates, { returnDocument: "after", runValidators: true }).select("-password");
        res.status(200).json({ msg: "Profile updated", data: user });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Created rides
const getCreatedRides = async (req, res) => {
    try {
        const createdRides = await Ride.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ count: createdRides.length, data: createdRides });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Joined rides
const getJoinedRides = async (req, res) => {
    try {
        const joinedRides = await Ride.find({ "passengers.user": req.user.id })
        res.status(200).json({ count: joinedRides.length, data: joinedRides });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getDashboard,
    getProfile,
    updateProfile,
    getCreatedRides,
    getJoinedRides
};