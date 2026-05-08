const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const AuthMiddleware = require('../middleWare/middleWare')

router.post("/create/:id", AuthMiddleware, bidController.createBid);

router.get("/my", AuthMiddleware, bidController.getMyBids);
router.get("/ride/:rideId", AuthMiddleware, bidController.getRideBids);

router.put("/accept/:bidId", AuthMiddleware, bidController.acceptBid);
router.put("/reject/:bidId", AuthMiddleware, bidController.rejectBid);

router.delete("/cancel/:bidId", AuthMiddleware, bidController.cancelBid);

module.exports = router;