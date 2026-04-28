const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const AuthMiddleware = require('../middleWare/middleWare')

router.post('/create' ,AuthMiddleware,rideController.createRide);
// router.get('/getAll', rideController.getAllRides);
// router.get('/getUser/:userId', rideController.getUserRides);
// router.put('accept/:rideId', rideController.acceptRide);
// router.put('/updateStatus/:rideId', rideController.updateRideStatus);

module.exports = router;