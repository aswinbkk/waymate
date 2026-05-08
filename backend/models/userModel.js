const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "user"
    },

    fullName: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String
      },
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

const User = mongoose.model("User", userSchema);
module.exports = User;