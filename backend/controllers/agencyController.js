const Agency = require('../models/agencyModel');
const sendEmail = require('../utils/sendEmail')
const { otpTemplate } = require("../utils/template/OtpEmailTemplates");
const { agencyValidation } = require("../validators/agencyValidation");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

// Register agency.
const registerAgency = async (req, res) => {

    try {

    const { error } = agencyValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, msg: error.details[0].message });
    }

    const { agencyName, address, gst, email, password, phone } = req.body;

    const existingEmail = await Agency.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ success: false, msg: "Email already registered" });
    }

    const existingPhone = await Agency.findOne({ phone });
    if (existingPhone) {
      return res.status(409).json({ success: false, msg: "Phone already registered" });
    }

    const existingGST = await Agency.findOne({ "gst.gstin": gst.gstin });
    if (existingGST) {
        return res.status(409).json({ success: false, msg: "GST already registered" });
    }
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const createdAgency = new Agency({
            agencyName,
            address: { street: address.street, city: address.city, state: address.state, pincode: address.pincode },
            gst: { gstin: gst.gstin, legalName: gst.legalName, tradeName: gst.tradeName },
            email,
            password: hashedPassword,
            phone
        });
        await createdAgency.save();
        res.status(201).json({ success:true, msg: "Agency registration successfully" });

    } catch (error) {
        res.status(500).json({ msg: `Server error ${error}` });
    }
};

// Login agency.
const loginAgency = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingAgency = await Agency.findOne({ email });

        if (!existingAgency) {
            return res.status(404).json({ msg: "Agency not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, existingAgency.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: existingAgency._id, role: existingAgency.role }, process.env.SECRET_KEY, { expiresIn: '24h' });
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
                name: existingAgency.agencyName,
                role: existingAgency.role
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, msg: `Server error,${error}` });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const agency = await Agency.findOne({ email });

        if (!agency) {
            return res.status(404).json({ msg: "Agency not found" });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const hashedOtp = await bcrypt.hash(otp, saltRounds);
        agency.otp = hashedOtp;

        // Expire in 10 minutes
        agency.otpExpire = Date.now() + 10 * 60 * 1000;
        await agency.save();

        // Send email
        await sendEmail({
            to: agency.email,
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

        const agency = await Agency.findOne({ email });
        if (!agency) {
            return res.status(400).json({ msg: "Invalid request" });
        }

        const isOtpMatch = await bcrypt.compare(otp, agency.otp);
        if (!isOtpMatch) {
            return res.status(400).json({ msg: "Invalid OTP" });
        }

        // Expiry check
        if (!agency.otpExpire || agency.otpExpire < Date.now()) {
            return res.status(400).json({ msg: "OTP expired" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        agency.password = hashedPassword;

        // Clear OTP fields
        agency.otp = undefined;
        agency.otpExpire = undefined;
        await agency.save();
        res.status(200).json({ msg: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Get profile
const getProfile = async (req, res) => {

    try {
        const agency = await Agency.findById(req.auth.id).select("-password");
        res.status(200).json({
            success: true,
            agency: {
                name: agency.fullName,
                email: agency.email,
                phone: agency.phone
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
        const agency = await Agency.findByIdAndUpdate(req.auth.id, updates, { returnDocument: "after", runValidators: true }).select("-password");
        res.status(200).json({ msg: "Profile updated", data: agency });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

module.exports = {
    registerAgency,
    loginAgency,
    forgotPassword,
    resetPassword,
    getProfile,
    updateProfile,
};