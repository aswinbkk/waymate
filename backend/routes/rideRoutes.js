const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

router.post('/', rideController.createRide);
router.get('/', rideController.getAllRides);
router.get('/user/rides/:userId', rideController.getUserRides);
router.put('agency/accept/:rideId', rideController.acceptRide);
router.put('/status/:rideId', rideController.updateRideStatus);

module.exports = router;