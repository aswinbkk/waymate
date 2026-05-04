const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const AuthMiddleware = require('../middleWare/middleWare')

router.post('/register', userController.registerUser );
router.post('/login', userController.loginUser);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

router.get('/dashboard/profile', AuthMiddleware, userController.getProfile);
router.put('/dashboard/profile/update', AuthMiddleware, userController.updateProfile);

module.exports = router;