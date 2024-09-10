// routes/callRoutes.js
const express = require('express');
const CallController = require('../controllers/callController');

const router = express.Router();

router.get('/chamados', CallController.getAllCalls);

module.exports = router;


