require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_DEV_URL)
        console.log('mongodb connected');
        
    } catch (error) {
        console.log('error in connecting mongodb');        
    }
};

module.exports = connectDB;