const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    ride: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
      index: true
    },
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    seats: {
      type: Number,
      default: 1,
      min: 1
    },
    amountPerSeat: {
      type: Number,
      required: true,
      min: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    message: {
      type: String,
      maxlength: 200
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

// One active bid per user per ride
bidSchema.index(
  { ride: 1, bidder: 1 },
  { unique: true, partialFilterExpression: { status: "pending" } }
);

// Auto-calc total
bidSchema.pre("validate", function (next) {
  if (this.amountPerSeat && this.seats) {
    this.totalAmount = this.amountPerSeat * this.seats;
  }
});

module.exports = mongoose.model("Bid", bidSchema);