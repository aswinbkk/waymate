const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/middleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

router.get("/dashboard/profile", authMiddleware, userController.getProfile);
router.put("/dashboard/profile/update", authMiddleware, userController.updateProfile);

module.exports = router;