const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');
const AuthMiddleware = require('../middleWare/middleWare')

router.post('/register', agencyController.registerAgency );
router.post('/login', agencyController.loginAgency);
router.post("/forgot-password", agencyController.forgotPassword);
router.post("/reset-password", agencyController.resetPassword);

router.get('/dashboard/profile', AuthMiddleware, agencyController.getProfile);
router.put('/dashboard/profile/update', AuthMiddleware, agencyController.updateProfile);

module.exports = router;