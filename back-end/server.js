const express = require('express');
const md5 = require('md5');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Configurações do banco de dados
const pool = mysql.createPool({
    connectionLimit: 10, // Limite máximo de conexões no pool
    host: process.env.DB_HOST || '10.161.100.11',
    user: process.env.DB_USER || 'bct_write',
    password: process.env.DB_PASSWORD || 'bcwriter22',
    database: process.env.DB_DATABASE || 'better_call_test'
});

// Rota de login
app.post('/login', (req, res) => {
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
            const token = jwt.sign({ col_login }, 'segredo');
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }
    });
});

app.listen(PORT, () => console.log('Servidor rodando na porta ', PORT));