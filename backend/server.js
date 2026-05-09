require("dotenv").config();

const express = require("express");

const app = express();

const connectDB = require("./config/db");

connectDB();

const userRoutes = require("./routes/userRoutes");
const userRideRoutes = require("./routes/userRideRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const agencyRideRoutes = require("./routes/agencyRideRoutes");
const bidRoutes = require("./routes/bidRoutes");

app.use(express.json());

app.use("/user", userRoutes);
app.use("/user-ride", userRideRoutes);
app.use("/agency", agencyRoutes);
app.use("/agency-ride", agencyRideRoutes);
app.use("/bid", bidRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});