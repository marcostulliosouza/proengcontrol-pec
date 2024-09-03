// routes/callRoutes.js
const express = require('express');
const CallController = require('../controllers/callController');

const router = express.Router();

router.get('/chamados/paginados', CallController.getPaginatedCalls);

module.exports = router;

