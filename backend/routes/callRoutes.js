// backend/routes/callRoutes.js
const express = require('express');
const CallController = require('../controllers/callController');
// const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para obter todos os chamados
router.get('/chamados', CallController.getAllCalls);

// Rota para atender um chamado
router.post('/chamados/:id/atender', CallController.setCallAsBeingAnswered);

// Rota para transferir um chamado
router.post('/chamados/:id/transferir', CallController.transferCallFromTo);

// Rota para desistir de um chamado
router.post('/chamados/:id/desistir', CallController.giveUpFromCall);

// Rota para fechar um chamado
router.post('/chamados/:id/fechar', CallController.closeCall);

module.exports = router;
