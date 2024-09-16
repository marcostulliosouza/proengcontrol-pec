// backend/routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');
// const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para obter todos os chamados
router.get('/usuarios', UserController.getAllUsers);

module.exports = router;