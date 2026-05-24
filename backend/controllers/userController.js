const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail')
const { otpTemplate } = require("../utils/template/OtpEmailTemplates");
const { userValidation } = require("../validators/userValidation");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// Register user
const registerUser = async (req, res) => {

  try {
    const { error } = userValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ success: false, msg: error.details[0].message, });
    }
    const { fullName, email, password, phone } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, msg: "User already exists", });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createdUser = new User({
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      },
      email,
      password: hashedPassword,
      phone,
    });
    await createdUser.save();
    res.status(201).json({ success: true, msg: "User registration successful", });

  } catch (error) {
    res.status(500).json({ success: false, msg: `Server error: ${error.message}`, });
  }
};

// Login user.
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare( password, existingUser.password );

        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, msg: "Invalid credentials"
            });
        }

        const token = jwt.sign( { id: existingUser._id, role: existingUser.role },
            process.env.SECRET_KEY, { expiresIn: "24h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            msg: "Login successful",
            user: {
                name: existingUser.fullName.firstName,
                email: existingUser.email
            }
        });

    } catch (error) {

        res.status(500).json({ success: false, msg: `Server error ${error}` });
    }
};

// Logout user.
const logoutUser = async (req, res) => {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        res.status(200).json({ success: true, msg: "Logout successful" });

    } catch (error) {
        res.status(500).json({ success: false, msg: `Server error ${error.message}` });
    }
};

// ForgotPassword
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

// ResetPassword
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

// Get profile
const getProfile = async (req, res) => {

    try {
        const user = await User.findById(req.auth.id) .select("-password");
        res.status(200).json({ success: true,
            user: {
                name: user.fullName,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, msg: `Server error ${error}` });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        delete updates.password;
        delete updates.role;
        delete updates.otp;
        delete updates.otpExpire;
        const user = await User.findByIdAndUpdate(req.auth.id, updates, { returnDocument: "after", runValidators: true }).select("-password");
        res.status(200).json({ msg: "Profile updated", data: user });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getProfile,
    updateProfile,
};