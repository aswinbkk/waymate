const express = require("express");

const router = express.Router();

const userRideController = require("../controllers/userRideController");
const authMiddleware = require("../middleware/middleware");

router.post("/create", authMiddleware, userRideController.createUserRide);
router.put("/update/:id", authMiddleware, userRideController.updateUserRide);
router.delete("/delete/:id", authMiddleware, userRideController.deleteUserRide);

router.post("/passenger/add/:id", authMiddleware, userRideController.addPassenger);
router.post("/passenger/remove/:id", authMiddleware, userRideController.removePassenger);

router.post("/join/:id", authMiddleware, userRideController.UserJoinRide);
router.post("/leave/:id", authMiddleware, userRideController.UserleaveRide);

router.get("/dashboard", authMiddleware, userRideController.userDashboard);
router.get("/dashboard/created", authMiddleware, userRideController.viewUserCreatedRides);
router.get("/dashboard/joined", authMiddleware, userRideController.viewUserJoinedRides);

router.get("/search", userRideController.searchUserRides);

module.exports = router;