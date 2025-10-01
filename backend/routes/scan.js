const express = require('express');
const router = express.Router();
const { analyzeSpecs } = require('../controllers/scanController');

router.post('/', analyzeSpecs);

module.exports = router;
