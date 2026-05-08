const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "agency"
    },

    agencyName: {
      type: String,
      required: true
    },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: {
        type: String,
        default: "India"
      },
    },

    gst: {
      gstin: {
        type: String,
        unique: true,
        sparse: true,
      },
      legalName: String,
      tradeName: String
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    otp: {
      type: String
    },

    otpExpire: {
      type: Date
    },

    phone: {
      type: String,
    }
  },
  { timestamps: true }
);

const Agency = mongoose.model("Agency", agencySchema);
module.exports = Agency;