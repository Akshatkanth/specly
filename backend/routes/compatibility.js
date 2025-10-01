const express = require('express');
const router = express.Router();
const { checkCompatibility } = require('../controllers/compatibilityController');

router.post('/', checkCompatibility);

module.exports = router;
