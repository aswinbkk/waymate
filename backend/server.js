const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Load correct env file
dotenv.config({
    path:
        process.env.NODE_ENV === "production"
            ? ".env.production"
            : ".env.development",
});

const connectDB = require("./config/db");

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(
    cors({
        origin:
            process.env.NODE_ENV === "production"
                ? "https://waymate-1.onrender.com"
                : "http://localhost:5173",
        credentials: true,
    })
);

// Routes
const userRoutes = require("./routes/userRoutes");
const userRideRoutes = require("./routes/userRideRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const agencyRideRoutes = require("./routes/agencyRideRoutes");
const bidRoutes = require("./routes/bidRoutes");

// Default Route
app.get("/", (req, res) => {
    res.send("Server Running 🚀");
});

// API Routes
app.use("/user", userRoutes);
app.use("/user-ride", userRideRoutes);
app.use("/agency", agencyRoutes);
app.use("/agency-ride", agencyRideRoutes);
app.use("/bid", bidRoutes);

// PORT
const PORT = process.env.PORT || 3000;

// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});