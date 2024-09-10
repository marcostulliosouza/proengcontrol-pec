// backend/routes/callRoutes.js
const express = require('express');
const CallController = require('../controllers/callController');

const router = express.Router();

router.get('/chamados', CallController.getAllCalls);
router.get('/indicadores/:period', CallController.getIndicators); // Nova rota para indicadores

module.exports = router;
