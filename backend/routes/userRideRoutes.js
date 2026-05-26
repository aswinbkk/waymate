const express = require("express");

const router = express.Router();

const userRideController = require("../controllers/userRideController");
const authMiddleware = require('../middleWare/middleWare');

router.post("/create", authMiddleware, userRideController.createUserRide);
router.put("/update/:id", authMiddleware, userRideController.updateUserRide);
router.delete("/delete/:id", authMiddleware, userRideController.deleteUserRide);

router.post("/passenger/add/:id", authMiddleware, userRideController.addPassenger);
router.post("/passenger/remove/:id", authMiddleware, userRideController.removePassenger);

router.post("/join/:id", authMiddleware, userRideController.userJoinRide);
router.post("/leave/:id", authMiddleware, userRideController.userleaveRide);

router.get("/dashboard", authMiddleware, userRideController.userDashboard);
router.get("/created-rides", authMiddleware, userRideController.viewUserCreatedRides);
router.get("/joined-rides", authMiddleware, userRideController.viewUserJoinedRides);

router.get("/search", userRideController.searchUserRides);
router.get("/view-all-ride", userRideController.getUserRide);

module.exports = router;