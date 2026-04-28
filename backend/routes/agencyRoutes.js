const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');

router.post('/register/agency', agencyController.createAgency);
router.post('/login', agencyController.loginAgency);

module.exports = router;