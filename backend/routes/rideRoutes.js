const express = require("express");

const router = express.Router();

const rideController = require("../controllers/rideController");
const authMiddleware = require("../middleware/middleware");

router.post("/create", authMiddleware, rideController.createRide);
router.put("/update/:id", authMiddleware, rideController.updateRide);

router.post("/passenger/add/:id", authMiddleware, rideController.addPassenger);
router.post("/passenger/remove/:id", authMiddleware, rideController.removePassenger);

router.post("/join/:id", authMiddleware, rideController.joinRide);
router.post("/leave/:id", authMiddleware, rideController.leaveRide);
router.delete("/delete/:id", authMiddleware, rideController.deleteRide);
router.get("/search", rideController.searchRides);

router.get("/dashboard", authMiddleware, rideController.getDashboard);
router.get("/dashboard/created", authMiddleware, rideController.getCreatedRides);
router.get("/dashboard/joined", authMiddleware, rideController.getJoinedRides);

module.exports = router;