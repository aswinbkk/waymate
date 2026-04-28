const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

router.post('/createRide', rideController.createRide);
router.get('/getAllRides', rideController.getAllRides);
router.get('/getUserRides/:userId', rideController.getUserRides);
router.put('acceptRide/:rideId', rideController.acceptRide);
router.put('/updateRideStatus/:rideId', rideController.updateRideStatus);

module.exports = router;