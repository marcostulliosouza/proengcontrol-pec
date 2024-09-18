// backend/routes/callRoutes.js
const express = require('express');
const CallController = require('../controllers/callController');
// const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para obter todos os chamados
router.get('/chamados', CallController.getAllCalls);

// Rota para alterar as datas de início e término de um chamado
router.post('/chamados/:callID/alterarDatas', CallController.changeCallDateTimes);


// Rota para atender um chamado
router.post('/chamados/:callID/atender', CallController.setCallAsBeingAnswered);

// Rota para transferir um chamado
router.post('/chamados/:callID/transferir', CallController.transferCallFromTo);

// Rota para desistir de um chamado
router.post('/chamados/:callID/desistir', CallController.giveUpFromCall);

// Rota para fechar um chamado
router.post('/chamados/:callID/fechar', CallController.closeCall);

// Rota para bloquear ou desbloquear um chamado
router.post('/chamados/:callID/lock', CallController.lockCall);

// Rota para verificar se um chamado está bloqueado
router.get('/chamados/:callID/locked', CallController.isLockedCall);

// Rota para obter ações realizadas em um chamado
router.get('/chamados/:callID/acoes', CallController.getActionTaken);

module.exports = router;