require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./config/db');
connectDB();

const userRoutes = require('./routes/userRouter');

// middleware
app.use(express.json());

// routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});