const express = require("express");

const router = express.Router();

const agencyRideController = require("../controllers/agencyRideController");
const authMiddleware = require("../middleware/middleware");

router.post("/create", authMiddleware, agencyRideController.createAgencyRide);
router.put("/update/:id", authMiddleware, agencyRideController.updateAgencyRide);

// router.post("/passenger/add/:id", authMiddleware, agencyRideController.addPassenger);
// router.post("/passenger/remove/:id", authMiddleware, agencyRideController.removePassenger);

// router.delete("/delete/:id", authMiddleware, agencyRideController.deleteRide);

// router.get("/search", agencyRideController.searchRides);

// router.get("/dashboard", authMiddleware, agencyRideController.getDashboard);
// router.get("/dashboard/created", authMiddleware, agencyRideController.getCreatedRides);
// router.get("/dashboard/joined", authMiddleware, agencyRideController.getJoinedRides);

module.exports = router;