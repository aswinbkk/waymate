const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
  {
    agencyname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
      capacity: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ["car", "bike", "auto"],
      },
    },
  },
  { timestamps: true }
);

const agency = mongoose.model("agency", agencySchema);
module.exports = agency;
