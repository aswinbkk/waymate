const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const AuthMiddleware = require('../middleWare/middleWare')

router.post('/create', AuthMiddleware, rideController.createRide);
router.post('/passenger/add/:id', AuthMiddleware, rideController.addPassenger);
router.post('/passenger/remove/:id', AuthMiddleware, rideController.removePassenger);
router.post('/join/:id', AuthMiddleware, rideController.joinRide);
router.post('/leave/:id', AuthMiddleware, rideController.leaveRide);
router.put('/update/:id', AuthMiddleware, rideController.updateRide);
router.delete('/delete/:id', AuthMiddleware, rideController.deleteRide);
router.get('/search', rideController.searchRides);

module.exports = router;