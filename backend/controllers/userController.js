const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail')
const { otpTemplate } = require("../utils/template/OtpEmailTemplates");
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

        res.status(201).json({msg: "User created successfully",
            data: {
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

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const hashedOtp = await bcrypt.hash(otp, saltRounds);
        user.otp = hashedOtp;

        // Expire in 10 minutes
        user.otpExpire = Date.now() + 10 * 60 * 1000;
        await user.save();

        // Send email
        await sendEmail({
            to: user.email,
            subject: "Password Reset OTP",
            html: otpTemplate(otp)
        });
        res.json({ msg: "OTP sent to email" });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid request" });
        }

        const isOtpMatch = await bcrypt.compare(otp, user.otp);
        if (!isOtpMatch) {
            return res.status(400).json({ msg: "Invalid OTP" });
        }

        // Expiry check
        if (!user.otpExpire || user.otpExpire < Date.now()) {
            return res.status(400).json({ msg: "OTP expired" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashedPassword;

        // Clear OTP fields
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();
        res.status(200).json({ msg: "Password reset successful" });

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

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getProfile,
    updateProfile,
};