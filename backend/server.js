const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Route
const userRoutes = require("./routes/userRoutes");
const userRideRoutes = require("./routes/userRideRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const agencyRideRoutes = require("./routes/agencyRideRoutes");
const bidRoutes = require("./routes/bidRoutes");

const app = express();

// Environment Configuration
dotenv.config({
    path:
        process.env.NODE_ENV === "production"
            ? ".env.production"
            : ".env.development",
});

// Database Connection
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

// Default Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "waymate backend server running successfully",
        environment: process.env.NODE_ENV,
    });
});

// API Routes
app.use("/user", userRoutes);
app.use("/user-ride", userRideRoutes);
app.use("/agency", agencyRoutes);
app.use("/agency-ride", agencyRideRoutes);
app.use("/bid", bidRoutes);

//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
        waymate server started successfully
        Environment : ${process.env.NODE_ENV}
        Port        : ${PORT}
`);
});