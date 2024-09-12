// backend/routes/callRoutes.js
const express = require('express');
const CallController = require('../controllers/callController');
// const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/chamados', CallController.getAllCalls);
router.get('/indicadores/:period', CallController.getIndicators); // Nova rota para indicadores
// Rota para definir um chamado como atendido
// Espera o ID do chamado na URL e o ID do responsável no corpo da requisição
router.post('/chamados/:callId/atender', CallController.setCallAsBeingAnswered);

module.exports = router;
