const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const createUser = async (req, res) => {
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
            fullname:
            {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password: hashedPassword,
            phone
        });

        await createdUser.save();

        res.status(201).json({
            msg: "User created successfully",
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

        const token = jwt.sign({id:existingUser._id},process.env.SECRET_KEY,{expiresIn:'1h'});
        res.status(200).json({msg:'Login successful',token:token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { createUser, loginUser };