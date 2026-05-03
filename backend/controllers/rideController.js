const Ride = require("../models/rideModel");
const geocodeAddress = require("../utils/geocode");
const getRoadDistance = require("../utils/osrm")
const calculateDistance = require("../utils/calculateDistance")

// Create ride (User or Agency).
const createRide = async (req, res) => {
    try {
        const {
            originName,
            destinationName,
            date,
            totalSeats,
            pricePerSeat,
            vehicleNumber,
            preferences
        } = req.body;


        if (!originName || !destinationName || !date || !totalSeats || !pricePerSeat || !vehicleNumber) {
            return res.status(400).json({ msg: "Missing required fields" });
        };

        const originCoords = await geocodeAddress(originName);
        const destCoords = await geocodeAddress(destinationName);

        if (!originCoords || !destCoords) {
      return res.status(400).json({ msg: "Invalid location" });
    }

    const origin = {
      name: originName,
      coordinates: {
        lat: originCoords.lat,
        lng: originCoords.lng
      }
    };

    const destination = {
      name: destinationName,
      coordinates: {
        lat: destCoords.lat,
        lng: destCoords.lng
      }
    };

    // Get ROAD distance (OSRM)
    let distanceData = await getRoadDistance(
      origin.coordinates,
      destination.coordinates
    );

    let distance;

    if (distanceData) {
      distance = distanceData.distance;
    } else {
      // fallback if OSRM fails
      distance = calculateDistance(
        origin.coordinates.lat,
        origin.coordinates.lng,
        destination.coordinates.lat,
        destination.coordinates.lng
      );
    }

    // Auto price
    const baseFare = 50;
    const perKmRate = 10;
    const acCharge = preferences?.ac ? 2 : 0;

    const totalCost = baseFare + distance * (perKmRate + acCharge);
    const autoPricePerSeat = Math.ceil(totalCost / totalSeats);

        const ride = await Ride({
            createdBy: req.user.id,
            createdByRole: req.user.role,
            origin: { name: originName, coordinates: originCoords },
            destination: { name: destinationName, coordinates: destCoords },
            date,
            totalSeats,
            availableSeats: totalSeats,
            autoPricePerSeat,
            pricePerSeat,
            vehicleNumber,
            preferences
        });
        await ride.save();
        res.status(201).json({ msg: "Ride created", data: ride });
    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Add passenger (creator only)
const addPassenger = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({ msg: "Ride not found" });
    }

    if (!ride.createdBy.equals(req.user.id)) {
      return res.status(403).json({msg: "Not authorized"});
    }

    if (ride.createdBy.equals(userId)) {
      return res.status(400).json({ msg: "Creator is already part of ride"});
    }

    const exists = ride.passengers.find(p => p.user.equals(userId));
    if (exists) {
      return res.status(400).json({msg: "User already in ride"});
    }

    if (ride.availableSeats <= 0) {
      return res.status(400).json({msg: "No seats available"});
    }

    ride.passengers.push({ user: userId });
    ride.availableSeats = ride.availableSeats-1;

    if (ride.availableSeats === 0) {
      ride.status = "full";
    }
    await ride.save();
    res.status(200).json({msg: "Passenger added",data: ride});

  } catch (error) {
    res.status(500).json({ msg: `Server error,${error}` });
  }
};

// Remove passenger (creator only)
const removePassenger = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({ msg: "Ride not found" });
    }

    if (!ride.createdBy.equals(req.user.id)) {
      return res.status(403).json({msg: "Not authorized"});
    }

    const index = ride.passengers.findIndex(p =>p.user.equals(userId));
    if (index === -1) {
      return res.status(400).json({msg: "User not in ride"});
    }

    // Remove passenger
    ride.passengers.splice(index, 1);
    ride.availableSeats = ride.availableSeats+1;

    if (ride.status === "full") {
      ride.status = "open";
    }
    await ride.save();
    res.status(201).json({msg: "Passenger removed",data: ride});

  } catch (error) {
    res.status(500).json({ msg: `Server error,${error}` });
  }
};

// Join a ride.
const joinRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await Ride.findById(id);

        if (!ride) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        if (ride.createdBy.equals(req.user.id)) {
            return res.status(400).json({ msg: "It's your own ride" });
        }

        if (ride.status !== "open") {
            return res.status(400).json({ msg: "Ride not open" });
        }

        if (ride.availableSeats <= 0) {
            return res.status(400).json({ msg: "No seats available" });
        }

        const existing = ride.passengers.find(params => params.user.equals(req.user.id));
        if (existing) {
            return res.status(400).json({ msg: "Already joined this ride" });
        }
        //add passenger
        ride.passengers.push({ user: req.user.id });
        ride.availableSeats = ride.availableSeats - 1;

        //update status
        if (ride.availableSeats === 0) {
            ride.status = "full";
        }

        await ride.save();
        res.status(201).json({ msg: "Joined ride successfully", data: ride });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Leave from ride.
const leaveRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await Ride.findById(id);

        if (!ride) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        const passengerIndex = ride.passengers.findIndex(params => params.user.equals(req.user.id));

        if (passengerIndex === -1) {
            return res.status(400).json({ msg: "You are not in this ride" });
        }

        // Remove passenger
        ride.passengers.splice(passengerIndex, 1);
        ride.availableSeats = ride.availableSeats + 1;

        // Reopen ride
        if (ride.status === "full") {
            ride.status = "open";
        };

        await ride.save();
        res.status(201).json({ msg: "Left ride successfully", data: ride });
    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Update ride.
const updateRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await Ride.findById(id);
        if (!ride) {
            return res.status(404).json({ msg: "Ride not found" });
        }

        if (!ride.createdBy.equals(req.user.id)) {
            return res.status(403).json({ msg: "Not authorized to update this ride" });
        }

        const updatedRide = await Ride.findByIdAndUpdate(id, req.body, { returnDocument: "after" });

        res.status(200).json({ msg: "Ride updated", data: updatedRide });
    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Delete ride.
const deleteRide = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRide = await Ride.findOneAndDelete({ _id: id, createdBy: req.user.id });

        if (!deletedRide) {
            return res.status(404).json({ msg: "Ride not found or not authorized" });
        }

        res.status(200).json({ msg: "Ride deleted successfully" });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

// Search ride.
const searchRides = async (req, res) => {
    try {
        const {
            originName,
            destinationName,
            range = 1,
            status = "open"
        } = req.body;

        if (originName && destinationName) {
            const originCoords = await geocodeAddress(originName);
            const destCoords = await geocodeAddress(destinationName);

            if (!originCoords || !destCoords) {
                return res.status(400).json({
                    msg: "Invalid or unrecognized location. Please enter a valid place."
                });
            }

            const originLat = originCoords.lat;
            const originLng = originCoords.lng;
            const destLat = destCoords.lat;
            const destLng = destCoords.lng;
            // Approx: 1 degree ≈ 111 km
            const radius = range / 111;

            const rides = await Ride.find({
                // Origin match
                "origin.coordinates.lat": { $gte: originLat - radius, $lte: originLat + radius },
                "origin.coordinates.lng": { $gte: originLng - radius, $lte: originLng + radius },
                // Destination match
                "destination.coordinates.lat": { $gte: destLat - radius, $lte: destLat + radius },
                "destination.coordinates.lng": { $gte: destLng - radius, $lte: destLng + radius },
                status: status
            });
            res.status(200).json({ msg: "Matching rides found", count: rides.length, data: rides });

        } else {
            // All rides
            const allRide = await Ride.find({ status: status }).sort({ createdAt: -1 })
            res.status(200).json({ msg: "All ride", count: allRide.length, data: allRide });
        }

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

module.exports = {
    createRide,
    addPassenger,
    removePassenger,
    joinRide,
    leaveRide,
    updateRide,
    deleteRide,
    searchRides
};