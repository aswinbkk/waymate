require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_DEV_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;