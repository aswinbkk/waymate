const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const AuthMiddleware = require('../middleWare/middleWare')

router.post('/create' ,AuthMiddleware,rideController.createRide);
router.post('/join/:id' ,AuthMiddleware,rideController.joinRide);
router.get('/allRide', rideController.getAllRides);
router.put('/update/:id', rideController.updateRide);
router.delete('/delete/:id', rideController.deleteRide);
// router.put('/updateStatus/:rideId', rideController.updateRideStatus);

module.exports = router;