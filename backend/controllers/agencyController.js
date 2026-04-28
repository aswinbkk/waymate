const Agency = require('../models/agencyModel');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const createAgency = async (req, res) => {
    const { agencyname, email, password, phone, vehicle } = req.body;

    if (!agencyname || !email || !password || !vehicle) {
        return res.status(400).json({ msg: "Required fields missing" });
    }

    try {
        const existingAgency = await Agency.findOne({ email });

        if (existingAgency) {
            return res.status(400).json({ msg: "Agency already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newAgency = await Agency.create({
            agencyname,
            email,
            password: hashedPassword,
            phone,
            vehicle: {
                color: vehicle.color,
                number: vehicle.number,
                capacity: vehicle.capacity,
                type: vehicle.type
            }
        });

        res.status(201).json({
            msg: "Agency created successfully",
            data: {
                id: newAgency._id,
                agencyname: newAgency.agencyname,
                email: newAgency.email,
                status: newAgency.status,
                vehicle: newAgency.vehicle
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

const loginAgency = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password required" });
    }

    try {
        const agency = await Agency.findOne({ email });

        if (!agency) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, agency.password);

        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        res.status(200).json({
            msg: "Login successful",
            data: {
                id: agency._id,
                agencyname: agency.agencyname,
                email: agency.email,
                status: agency.status
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = {
    createAgency,
    loginAgency
};