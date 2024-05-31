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
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor backend rodando em http://0.0.0.0:${PORT}`);
  });
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

// Rota para coletar dados dos locais
app.get('/api/locais', (req, res) => {
    const query = `
        SELECT
            *
        FROM
            local_chamado
        ORDER BY
            loc_nome
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        return res.status(200), res.json(result);
    });
});

// Rota para coletar dados dos tipos de chamados
app.get('/api/tiposChamados', (req, res) => {
    const query = `
        SELECT
            *
        FROM
            tipos_chamado
        ORDER BY
            tch_descricao
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        return res.status(200), res.json(result);
    });
});

// Rota para coletar dados dos clientes
app.get('/api/clientes', (req, res) => {
    const query = `
        SELECT
            *
        FROM
            clientes
        ORDER BY
            cli_nome
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        return res.status(200), res.json(result);
    });
});

// Rota para coletar dados dos produtos
app.get('/api/produtos', (req, res) => {
    const query = `
        SELECT
            *
        FROM
            produtos
        ORDER BY
            pro_nome
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        return res.status(200), res.json(result);
    });
});

// Rota para coletar dados dos computadores
app.get('/api/computadores', (req, res) => {
    const query = `
        SELECT
            *
        FROM
            computadores
        ORDER BY
            cmp_id
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        return res.status(200), res.json(result);
    });
});

// Rota para coletar dados dos produtos vinculados aos computadores
app.get('/api/vinculoComputadores', (req, res) => {
    const query = `
        SELECT
            *
        FROM
            vinculacao_computadores_produtos
        ORDER BY
            vcp_produtos_pro_id
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
app.get('/api/visualizarchamados', (req, res) => {
    const query = `
                SELECT 
                    chamados.*, 
                    produtos.pro_nome AS produto_nome, 
                    clientes.cli_nome AS cliente_nome, 
                    tipos_chamado.tch_descricao AS tipo_chamado, 
                    colaboradores.col_login AS responsavel 
                FROM 
                    chamados 
                    LEFT JOIN produtos ON chamados.cha_produto = produtos.pro_id 
                    LEFT JOIN clientes ON chamados.cha_cliente = clientes.cli_id 
                    LEFT JOIN tipos_chamado ON cha_tipo = tch_id 
                    LEFT JOIN atendimentos_chamados ON atendimentos_chamados.atc_chamado = cha_id 
                    LEFT JOIN colaboradores ON atendimentos_chamados.atc_colaborador = colaboradores.col_id
                WHERE 
                    chamados.cha_status = 1 OR chamados.cha_status = 2 
                ORDER BY 
                    chamados.cha_status DESC, chamados.cha_data_hora_abertura ASC;
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
                    colaboradores.col_login AS responsavel 
                FROM 
                    chamados 
                    LEFT JOIN produtos ON chamados.cha_produto = produtos.pro_id 
                    LEFT JOIN clientes ON chamados.cha_cliente = clientes.cli_id 
                    LEFT JOIN tipos_chamado ON cha_tipo = tch_id 
                    LEFT JOIN atendimentos_chamados ON atendimentos_chamados.atc_chamado = cha_id 
                    LEFT JOIN colaboradores ON atendimentos_chamados.atc_colaborador = colaboradores.col_id
                WHERE 
                    chamados.cha_status = 1 OR chamados.cha_status = 2 
                ORDER BY 
                    chamados.cha_status DESC, chamados.cha_data_hora_abertura ASC;
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        return res.status(200), res.json(result);
    });
});
// Rota para obter os indicadores diários de chamadas
app.get('/api/indicadoresdiarios', (req, res) => {
    const query = `
        SELECT 
            COUNT(cha_id) AS dailyTotalCalls,
            SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, cha_data_hora_abertura, cha_data_hora_atendimento))) AS dailyAvgAnswering,
            SEC_TO_TIME(AVG(IF(cha_data_hora_abertura < cha_data_hora_atendimento, TIMESTAMPDIFF(SECOND, cha_data_hora_abertura, cha_data_hora_atendimento), 0))) AS dailyAvgLate,
            IFNULL(ROUND((SUM(pdp_total_horas * 60) - SUM(IF(cha_data_hora_abertura < cha_data_hora_atendimento, TIMESTAMPDIFF(SECOND, cha_data_hora_abertura, cha_data_hora_atendimento), 0)) - SUM(IF(cha_data_hora_abertura < cha_data_hora_termino, TIMESTAMPDIFF(SECOND, cha_data_hora_atendimento, cha_data_hora_termino), 0))) / SUM(pdp_total_horas * 60) * 100, 2), 0) AS dailyUpTime
        FROM 
            chamados
            LEFT JOIN atendimentos_chamados ON chamados.cha_id = atendimentos_chamados.atc_chamado
            LEFT JOIN planos_de_producao ON DATE(chamados.cha_data_hora_abertura) = planos_de_producao.pdp_data
        WHERE 
            chamados.cha_status = 3
            AND chamados.cha_plano = 1
            AND DATE(chamados.cha_data_hora_abertura) = CURDATE()
    `;
    
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        
        const dailyIndicators = {
            dailyTotalCalls: result[0].dailyTotalCalls,
            dailyAvgAnswering: result[0].dailyAvgAnswering,
            dailyAvgLate: result[0].dailyAvgLate,
            dailyUpTime: result[0].dailyUpTime.toFixed(2) + "%"
        };
        return res.status(200).json(dailyIndicators);
    });
});

// Rota para obter os indicadores semanais de chamadas
app.get('/api/indicadoressemanais', (req, res) => {
    const query = `
        SELECT 
            COUNT(cha_id) AS totalCalls,
            SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, cha_data_hora_abertura, cha_data_hora_atendimento))) AS avgAnswering,
            SEC_TO_TIME(AVG(IF(cha_data_hora_abertura < cha_data_hora_atendimento, TIMESTAMPDIFF(SECOND, cha_data_hora_abertura, cha_data_hora_atendimento), 0))) AS avgLate,
            IFNULL(ROUND((SUM(pdp_total_horas * 60) - SUM(IF(cha_data_hora_abertura < cha_data_hora_atendimento, TIMESTAMPDIFF(SECOND, cha_data_hora_abertura, cha_data_hora_atendimento), 0)) - SUM(IF(cha_data_hora_abertura < cha_data_hora_termino, TIMESTAMPDIFF(SECOND, cha_data_hora_atendimento, cha_data_hora_termino), 0))) / SUM(pdp_total_horas * 60) * 100, 2), 0) AS uptime
        FROM 
            chamados
            LEFT JOIN atendimentos_chamados ON chamados.cha_id = atendimentos_chamados.atc_chamado
            LEFT JOIN planos_de_producao ON DATE(chamados.cha_data_hora_abertura) = planos_de_producao.pdp_data
        WHERE 
            chamados.cha_status = 3
            AND chamados.cha_plano = 1
            AND WEEK(chamados.cha_data_hora_abertura) = WEEK(CURDATE())
            AND YEAR(chamados.cha_data_hora_abertura) = YEAR(CURDATE())
    `;
    
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        
        const weeklyIndicators = {
            weeklyTotalCalls: result[0].totalCalls,
            weeklyAvgAnswering: result[0].avgAnswering,
            weeklyAvgLate: result[0].avgLate,
            weeklyUpTime: result[0].uptime.toFixed(2) + "%"
        };

        return res.status(200).json(weeklyIndicators);
    });
});

// Rota para obter os indicadores mensais de chamadas
app.get('/api/indicadores_mensais', (req, res) => {
    const query = `
        SELECT 
            COUNT(cha_id) AS totalCalls,
            SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, cha_data_hora_abertura, cha_data_hora_atendimento))) AS avgAnswering,
            SEC_TO_TIME(AVG(IF(cha_data_hora_abertura < cha_data_hora_atendimento, TIMESTAMPDIFF(SECOND, cha_data_hora_abertura, cha_data_hora_atendimento), 0))) AS avgLate,
            IFNULL(ROUND((SUM(pdp_total_horas * 60) - SUM(IF(cha_data_hora_abertura < cha_data_hora_atendimento, TIMESTAMPDIFF(SECOND, cha_data_hora_abertura, cha_data_hora_atendimento), 0)) - SUM(IF(cha_data_hora_abertura < cha_data_hora_termino, TIMESTAMPDIFF(SECOND, cha_data_hora_atendimento, cha_data_hora_termino), 0))) / SUM(pdp_total_horas * 60) * 100, 2), 0) AS uptime
        FROM 
            chamados
            LEFT JOIN atendimentos_chamados ON chamados.cha_id = atendimentos_chamados.atc_chamado
            LEFT JOIN planos_de_producao ON DATE(chamados.cha_data_hora_abertura) = planos_de_producao.pdp_data
        WHERE 
            chamados.cha_status = 3
            AND chamados.cha_plano = 1
            AND MONTH(chamados.cha_data_hora_abertura) = MONTH(CURDATE())
            AND YEAR(chamados.cha_data_hora_abertura) = YEAR(CURDATE())
    `;
    
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        
        const monthlyIndicators = {
            monthlyTotalCalls: result[0].totalCalls,
            monthlyAvgAnswering: result[0].avgAnswering,
            monthlyAvgLate: result[0].avgLate,
            monthlyUpTime: result[0].uptime.toFixed(2) + "%"
        };

        return res.status(200).json(monthlyIndicators);
    });
});
// Rota para contar os atendimentos por colaborador
app.get('/api/atendimentosPorColaborador', (req, res) => {
    const query = `
        SELECT 
            colaboradores.col_nome AS nomeColaborador,
            COUNT(atendimentos_chamados.atc_id) AS totalAtendimentos
        FROM 
            atendimentos_chamados
            LEFT JOIN colaboradores ON atendimentos_chamados.atc_colaborador = colaboradores.col_id
        GROUP BY
            colaboradores.col_id
    `;
    
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }      
        
        const atendimentosPorColaborador = result.map(row => ({
            nomeColaborador: row.nomeColaborador,
            totalAtendimentos: row.totalAtendimentos
        }));

        return res.status(200).json(atendimentosPorColaborador);
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