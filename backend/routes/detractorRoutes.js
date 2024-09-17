const express = require('express');
const DetractorController = require('../controllers/detractorController');

const router = express.Router();

// Define a rota para obter os detratores
router.get('/detratores', DetractorController.getDetractors);

module.exports = router;
