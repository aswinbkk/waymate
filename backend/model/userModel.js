const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
      },
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
    }
  },
  { timestamps: true }
);

const user = mongoose.model("users", userSchema);
module.exports = user;
