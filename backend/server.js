const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

connectDB();

app.use(express.json());

app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send("server running")
})
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const userRoutes = require("./routes/userRoutes");
const userRideRoutes = require("./routes/userRideRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const agencyRideRoutes = require("./routes/agencyRideRoutes");
const bidRoutes = require("./routes/bidRoutes");

app.use("/user", userRoutes);
app.use("/user-ride", userRideRoutes);
app.use("/agency", agencyRoutes);
app.use("/agency-ride", agencyRideRoutes);
app.use("/bid", bidRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});