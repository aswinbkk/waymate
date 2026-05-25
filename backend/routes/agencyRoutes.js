const express = require("express");

const router = express.Router();

const agencyController = require("../controllers/agencyController");
const authMiddleware = require("../middleware/middleware");

router.post("/register", agencyController.registerAgency);
router.post("/login", agencyController.loginAgency);
router.post("/forgot-password", agencyController.forgotPassword);
router.post("/reset-password", agencyController.resetPassword);

router.get("/profile", authMiddleware, agencyController.getProfile);
router.put("/dashboard/profile/update", authMiddleware, agencyController.updateProfile);

module.exports = router;