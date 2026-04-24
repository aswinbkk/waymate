require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);    
});