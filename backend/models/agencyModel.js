const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "agency",
    },

    agencyName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      pincode: {
        type: String,
        required: true,
        trim: true,
      },

      country: {
        type: String,
        default: "India",
      },
    },

    gst: {
      gstin: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      legalName: {
        type: String,
        required: true,
        trim: true,
      },

      tradeName: {
        type: String,
        required: true,
        trim: true,
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
    },

    otpExpire: {
      type: Date,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;