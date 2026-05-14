const express = require("express");

const router = express.Router();

const agencyRideController = require("../controllers/agencyRideController");
const authMiddleware = require("../middleware/middleware");

router.post("/create", authMiddleware, agencyRideController.createAgencyRide);
router.put("/update/:id", authMiddleware, agencyRideController.updateAgencyRide);
router.delete("/delete/:id", authMiddleware, agencyRideController.deleteAgencyRide);

router.post("/passenger/add/:id", authMiddleware, agencyRideController.addPassenger);
router.post("/passenger/remove/:id", authMiddleware, agencyRideController.removePassenger);

router.get("/dashboard", authMiddleware, agencyRideController.agencyDashboard);
router.get("/dashboard/created", authMiddleware, agencyRideController.viewAgencyCreatedRides);

router.get("/search", agencyRideController.searchAgencyRides);
router.get("/view-all-ride", agencyRideController.getAgencyRide);

module.exports = router;