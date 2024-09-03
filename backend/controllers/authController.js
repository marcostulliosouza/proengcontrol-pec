// /controllers/authController.js
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { secret } = require('../config/jwt');

const login = (req, res) => {
    const { col_login, col_senha } = req.body;

    const query = 'SELECT * FROM colaboradores WHERE col_login = ?';
    pool.query(query, [col_login], (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const user = result[0];
        if (user.col_senha === md5(col_senha)) {
            const token = jwt.sign({ col_login }, secret);
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
};

module.exports = {
    login,
};
