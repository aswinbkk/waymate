const Ride = require("../models/rideModel");
const geocodeAddress = require("../utils/geocode");

// create ride (User or Agency)
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
            return res.status(400).json({ message: "Missing required fields" });
        }

        const originCoords = await geocodeAddress(originName);
        const destCoords = await geocodeAddress(destinationName);
        
        const ride = await Ride({
            createdBy: req.user.id,
            createdByRole: req.user.role,
            origin:
            {
                name: originName,
                coordinates: originCoords
            },
            destination:
            {
                name: destinationName,
                coordinates: destCoords
            },
            date,
            totalSeats,
            availableSeats: totalSeats,
            pricePerSeat,
            vehicleNumber,
            preferences
        });
        await ride.save();
        res.status(201).json({ msg: "Ride created successfully", data: ride });

    } catch (error) {
        res.status(500).json({ msg: `Server error,${error}` });
    }
};

//get near by Rides by coordinates matching
const getNearbyRides = async (req, res) => {
  try {
    const {
      originName,
      destinationName,
      range
    } = req.body;

    if (!originName || !destinationName) {
      return res.status(400).json({msg: "origin and destination are required"});
    }

    const originCoords = await geocodeAddress(originName);
    const destCoords = await geocodeAddress(destinationName);

    const originLat = originCoords.lat;
    const originLng = originCoords.lng;

    const destLat = destCoords.lat;
    const destLng = destCoords.lng;

    //Approx: 1 degree ≈ 111 km
    const radius = range / 111;

    const rides = await Ride.find({
      //Pickup match
      "origin.coordinates.lat": {
        $gte: originLat - radius,
        $lte: originLat + radius
      },
      "origin.coordinates.lng": {
        $gte: originLng - radius,
        $lte: originLng + radius
      },

      //Destination match
      "destination.coordinates.lat": {
        $gte: destLat - radius,
        $lte: destLat + radius
      },
      "destination.coordinates.lng": {
        $gte: destLng - radius,
        $lte: destLng + radius
      },

      status: "open"
    })
      .populate("createdBy", "name email role")
      .populate("passengers.user", "name");

    res.status(200).json({msg: "Matching rides found",count: rides.length,data: rides});

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server error,${error}` });

  }
};


// join ride
const joinRide = async (req, res) => {
    try {
        const { id } = req.params;
        const ride = await Ride.findById(id);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        //ride not open
        if (ride.status !== "open") {
            return res.status(400).json({ message: "Ride not available" });
        }

        //no seats
        if (ride.availableSeats <= 0) {
            return res.status(400).json({ message: "No seats available" });
        }

        //already joined
        const existing = ride.passengers.find(p => p.user.equals(req.user.id));
        if (existing) {
            return res.status(400).json({ message: "Already joined this ride" });
        }

        //add passenger
        ride.passengers.push({
            user: req.user.id
        });
        ride.availableSeats -= 1;

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

//leave ride
const leaveRide = async (req, res) => {
  try {
    const { id } = req.params;
    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({ msg: "Ride not found" });
    }

    const passengerIndex = ride.passengers.findIndex(
        p => p.user.equals(req.user.id)
    );

    if (passengerIndex === -1) {
      return res.status(400).json({ msg: "You are not in this ride" });
    }

    // Remove passenger
    ride.passengers.splice(passengerIndex, 1);
    ride.availableSeats += 1;

    // Reopen ride
    if (ride.status === "full") {
      ride.status = "open";
    }

    await ride.save();
    
    res.status(201).json({ msg: "Left ride successfully", data: ride });

  } catch (error) {
    res.status(500).json({ msg: `Server error,${error}` });
  }
};

//get all ride
const getAllRides = async (req, res) => {
    try {
        const getData = await Ride.find().sort({ createdAt: -1 });
        res.status(200).json({ msg: "all ride", data: getData });
    } catch (error) {
        res.status(500).json({ msg: "server error" });
    }
};

//update ride
const updateRide = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = await Ride.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
        if (!updateData) {
            return res.status(404).json({ msg: "ride not fonud" });
        }
        res.status(200).json({ msg: "ride updated", updateddata: updateData });
    } catch (error) {
        res.status(500).json({ msg: "server error" });
    }
};


const deleteRide = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteData = await Ride.findByIdAndDelete(id);
        if (!deleteData) {
            return res.status(404).json({ msg: "ride not fonud" });
        }
        res.status(200).json({ msg: "ride deleted" });
    } catch (error) {
        res.status(500).json({ msg: "server error" });
    }
};

module.exports = {
    createRide,
    getNearbyRides,
    joinRide,
    leaveRide,
    getAllRides,
    updateRide,
    deleteRide
};