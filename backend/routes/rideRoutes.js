const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const AuthMiddleware = require('../middleWare/middleWare')

router.post('/create' ,AuthMiddleware,rideController.createRide);
router.get('/search/location' ,rideController.getNearbyRides);
router.post('/join/:id' ,AuthMiddleware,rideController.joinRide);
router.post('/leave/:id' ,AuthMiddleware,rideController.leaveRide);
router.get('/allRide', rideController.getAllRides);
router.put('/update/:id', rideController.updateRide);
router.delete('/delete/:id', rideController.deleteRide);

module.exports = router;