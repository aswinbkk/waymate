const mongoose = require("mongoose");
const Bid = require("../models/bidModel");
const Ride = require("../models/rideModel");


// CREATE BID
const createBid = async (req, res) => {
  try {
    const { id } = req.params;
    const { rideId, amountPerSeat, seats = 1, message } = req.body;

    if (!rideId || !amountPerSeat) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const ride = await Ride.findById(id);
    if (!ride) {
      return res.status(404).json({ msg: "Ride not found" });
    }

    if (ride.createdBy.equals(req.user.id)) {
      return res.status(400).json({ msg: "Cannot bid on your own ride" });
    }

    if (ride.status !== "open") {
      return res.status(400).json({ msg: "Ride is not open for bidding" });
    }

    // check existing pending bid
    const existing = await Bid.findOne({
      ride: rideId,
      bidder: req.user.id,
      status: "pending"
    });

    if (existing) {
      return res.status(400).json({ msg: "You already have a pending bid" });
    }

    const bid = await Bid.create({
      ride: rideId,
      bidder: req.user.id,
      amountPerSeat,
      seats,
      message
    });

    res.status(201).json({
      msg: "Bid placed successfully",
      data: bid
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// GET BIDS FOR A RIDE (Owner)
const getRideBids = async (req, res) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ msg: "Ride not found" });

    if (!ride.createdBy.equals(req.user.id)) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const bids = await Bid.find({ ride: rideId })
      .populate("bidder", "name email")
      .sort({ createdAt: -1 });

    res.json({
      count: bids.length,
      data: bids
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET MY BIDS
const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ bidder: req.user.id })
      .populate("ride", "origin destination date pricePerSeat status")
      .sort({ createdAt: -1 });

    res.json({
      count: bids.length,
      data: bids
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

//  ACCEPT BID (Ride Owner)
const acceptBid = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) throw new Error("Bid not found");

    const ride = await Ride.findById(bid.ride).session(session);
    if (!ride) throw new Error("Ride not found");

    if (!ride.createdBy.equals(req.user.id)) {
      throw new Error("Not authorized");
    }

    if (bid.status !== "pending") {
      throw new Error("Bid already processed");
    }

    if (ride.availableSeats < bid.seats) {
      throw new Error("Not enough seats available");
    }

    // Accept bid
    bid.status = "accepted";
    await bid.save({ session });

    // Add passenger
    ride.passengers.push({ user: bid.bidder });
    ride.availableSeats -= bid.seats;

    if (ride.availableSeats === 0) {
      ride.status = "full";
    }

    await ride.save({ session });

    // Reject other bids of same user (optional)
    await Bid.updateMany(
      {
        ride: ride._id,
        bidder: bid.bidder,
        _id: { $ne: bid._id }
      },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({ msg: "Bid accepted successfully" });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ msg: error.message });
  }
};



// REJECT BID
const rejectBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId);
    if (!bid) return res.status(404).json({ msg: "Bid not found" });

    const ride = await Ride.findById(bid.ride);

    if (!ride.createdBy.equals(req.user.id)) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    bid.status = "rejected";
    await bid.save();

    res.json({ msg: "Bid rejected" });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};



// CANCEL MY BID

const cancelBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId);

    if (!bid) return res.status(404).json({ msg: "Bid not found" });

    if (!bid.bidder.equals(req.user.id)) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    if (bid.status !== "pending") {
      return res.status(400).json({ msg: "Cannot cancel processed bid" });
    }

    bid.status = "cancelled";
    await bid.save();

    res.json({ msg: "Bid cancelled" });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createBid,
  getRideBids,
  getMyBids,
  acceptBid,
  rejectBid,
  cancelBid
}