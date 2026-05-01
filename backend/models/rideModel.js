const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    createdByRole: {
      type: String,
      enum: ["user", "agency"],
      required: true
    },

    origin: {
      name: { type: String, required: true },
      coordinates: { type: Object, required: true }
    },
    
    destination: {
      name: { type: String, required: true },
      coordinates: { type: Object, required: true}
    },

    date: {
      type: Date,
      required: true
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1
    },

    availableSeats: {
      type: Number,
      required: true,
      min: 0
    },

    pricePerSeat: {
      type: Number,
      required: true,
      min: 0
    },

    vehicleNumber: {
      type: String,
      required: function () {
        return this.createdByRole === "agency";
      },
    },

    passengers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        joinedAt: {
          type: Date,
          default: Date.now
        },
      },
    ],

    preferences: {
      gender: {
        type: String,
        enum: ["male", "female", "any"],
        default: "any"
      },
      ac: {
        type: Boolean,
        default: false,
      },
    },

    status: {
      type: String,
      enum: ["open", "full", "ongoing", "completed", "cancelled"],
      default: "open"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", rideSchema);