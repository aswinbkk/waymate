require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./config/db');
connectDB();

const userRoutes = require('./routes/userRouter');

// middleware
app.use(express.json());

// routes
app.use('/user', userRoutes);
app.use('/agency', agencyRoutes);
app.use('/ride', rideRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});