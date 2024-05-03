const express = require('express');
const md5 = require('md5');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const http = require('http');
const socketIo = require('socket.io');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

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

// Rota para buscar chamados
app.get('/api/visualizar_chamados', (req, res) => {
    const query = `
                SELECT 
                    chamados.*, 
                    produtos.pro_nome AS produto_nome, 
                    clientes.cli_nome AS cliente_nome, 
                    tipos_chamado.tch_descricao AS tipo_chamado, 
                    colaboradores.col_nome AS responsavel 
                FROM 
                    chamados 
                    LEFT JOIN produtos ON chamados.cha_produto = produtos.pro_id 
                    LEFT JOIN clientes ON chamados.cha_cliente = clientes.cli_id 
                    LEFT JOIN tipos_chamado ON cha_tipo = tch_id 
                    LEFT JOIN atendimentos_chamados ON atendimentos_chamados.atc_chamado = cha_id 
                    LEFT JOIN colaboradores ON atendimentos_chamados.atc_colaborador = colaboradores.col_id
                WHERE 
                    chamados.cha_status < 3 
                ORDER BY 
                    chamados.cha_id DESC;
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        return res.status(200), res.json(result);
    });
});

// Rota para buscar chamados
app.get('/api/chamados', (req, res) => {
    const query = `
                SELECT 
                    chamados.*, 
                    produtos.pro_nome AS produto_nome, 
                    clientes.cli_nome AS cliente_nome, 
                    tipos_chamado.tch_descricao AS tipo_chamado, 
                    colaboradores.col_nome AS responsavel 
                FROM 
                    chamados 
                    LEFT JOIN produtos ON chamados.cha_produto = produtos.pro_id 
                    LEFT JOIN clientes ON chamados.cha_cliente = clientes.cli_id 
                    LEFT JOIN tipos_chamado ON cha_tipo = tch_id 
                    LEFT JOIN atendimentos_chamados ON atendimentos_chamados.atc_chamado = cha_id 
                    LEFT JOIN colaboradores ON atendimentos_chamados.atc_colaborador = colaboradores.col_id
                WHERE 
                    chamados.cha_status < 3 
                ORDER BY 
                    chamados.cha_id DESC;
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        return res.status(200), res.json(result);
    });
});

// Rora para criar chamados

// // WebSocket para notificar alteração no banco
// io.on('connection', socket => {
//     console.log('Nova alteração no banco');
//     // Exemplo de envio de mensagem para o cliente quando os chamados forem atualizados
//     socket.on('chamadosUpdated', () => {
//         console.log('Chamados atualizados. Notificando cliente...');
//         socket.emit('chamadosAtualizados');
//     });
// });

server.listen(PORT, () => console.log('Servidor rodando na porta ', PORT));