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

// Rota para coletar dados dos dispositivos (jigas)
app.get('/api/dispositivos', (req, res) => {
    const query = `
        SELECT
            *
        FROM
            dispositivos
        ORDER BY
            dis_id DESC
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        return res.status(200), res.json(result);
    });
});

// Rota para coletar dados das notas fiscais das jigas
app.get('/api/entradaSaidaEquipamento', (req, res) => {
    const query = `
        SELECT
            *
        FROM
            entrada_saida_equipamento
        ORDER BY
            ese_id DESC
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        return res.status(200), res.json(result);
    });
});

// Rota para coletar dados das notas fiscais das jigas
app.get('/api/notasFiscais', (req, res) => {
    const query = `
        SELECT
            *
        FROM
            notas_fiscais
        ORDER BY
            nof_id DESC
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
            colaboradores.col_id AS responsavel
        FROM 
            chamados 
            LEFT JOIN produtos ON chamados.cha_produto = produtos.pro_id 
            LEFT JOIN clientes ON chamados.cha_cliente = clientes.cli_id 
            LEFT JOIN tipos_chamado ON cha_tipo = tch_id 
            LEFT JOIN atendimentos_chamados ON atendimentos_chamados.atc_chamado = cha_id 
            LEFT JOIN colaboradores ON atendimentos_chamados.atc_colaborador = colaboradores.col_id
            LEFT JOIN local_chamado ON cha_local = loc_nome
        WHERE 
            chamados.cha_status < 3
        ORDER BY 
            chamados.cha_data_hora_abertura DESC;
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        return res.status(200).json(result);
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
                    colaboradores.col_id AS responsavel 
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
        console.log('result:', result);
        return res.status(200), res.json(result);
    });
});

// Rota para obter os indicadores diários de chamados
app.get('/api/indicadoresdiarios', (req, res) => {
    const query1 = `
        SELECT
            COUNT(cha_id) AS totalCalls,
            SUM(
                IF(
                    cha_data_hora_abertura < cha_data_hora_termino,
                    TIMESTAMPDIFF(
                        MINUTE,
                        IF(
                            cha_data_hora_abertura > cha_data_hora_atendimento,
                            cha_data_hora_abertura,
                            cha_data_hora_atendimento
                        ),
                        cha_data_hora_termino
                    ),
                    0
                )
            ) AS totalAnsweringTime,
            SUM(
                IF(
                    cha_data_hora_abertura < cha_data_hora_atendimento,
                    TIMESTAMPDIFF(MINUTE, cha_data_hora_abertura, cha_data_hora_atendimento),
                    0
                )
            ) AS totalLateTime
        FROM chamados
        LEFT JOIN acoes_chamados ON cha_acao = ach_id
        LEFT JOIN detratores ON ach_detrator = dtr_id
        WHERE
            cha_status = 3 AND
            cha_plano = 1 AND
            DAY(cha_data_hora_abertura) = DAY(NOW()) AND
            WEEK(cha_data_hora_abertura) = WEEK(NOW()) AND
            MONTH(cha_data_hora_abertura) = MONTH(NOW()) AND
            YEAR(cha_data_hora_abertura) = YEAR(NOW()) AND
            dtr_indicador > 0
    `;

    pool.query(query1, (err, rows1) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ error: 'Erro ao buscar os indicadores semanais.' });
        }

        let { totalCalls, totalAnsweringTime, totalLateTime } = rows1[0];
        totalAnsweringTime = totalAnsweringTime || 0;
        totalLateTime = totalLateTime || 0;

        let dailyTotalCalls = totalCalls;
        let dailyAvgAnswering = "00:00";
        let dailyAvgLate = "00:00";

        if (totalCalls > 0) {
            let avgAnswering = Math.round(totalAnsweringTime / totalCalls);
            let avgLate = Math.round(totalLateTime / totalCalls);
            dailyAvgAnswering = `${String(Math.floor(avgAnswering / 60)).padStart(2, '0')}:${String(avgAnswering % 60).padStart(2, '0')}`;
            dailyAvgLate = `${String(Math.floor(avgLate / 60)).padStart(2, '0')}:${String(avgLate % 60).padStart(2, '0')}`;
        }

        const query2 = `
            SELECT SUM(pdp_total_horas * 60) AS totalHours
            FROM planos_de_producao
            WHERE
                DAY(pdp_data) = DAY(NOW()) AND
                WEEK(pdp_data) = WEEK(NOW()) AND
                MONTH(pdp_data) = MONTH(NOW()) AND
                YEAR(pdp_data) = YEAR(NOW())
        `;

        pool.query(query2, (err, rows2) => {
            if (err) {
                console.error('Erro:', err);
                return res.status(500).json({ error: 'Erro ao buscar os indicadores semanais.' });
            }

            let totalHours = rows2[0].totalHours || 0;
            let dailyUpTime = "0.00%";

            if (totalHours > 0) {
                let uptime = 1 - ((totalAnsweringTime + totalLateTime) / totalHours);
                dailyUpTime = `${(uptime * 100).toFixed(2)}%`;
            } else {
                dailyUpTime = "100.00%";
            }

            res.json({
                dailyTotalCalls,
                dailyAvgAnswering,
                dailyAvgLate,
                dailyUpTime
            });
        });
    });
});

// Rota para obter os indicadores semanais de chamados
app.get('/api/indicadoressemanais', (req, res) => {
    const query1 = `
        SELECT
            COUNT(cha_id) AS totalCalls,
            SUM(
                IF(
                    cha_data_hora_abertura < cha_data_hora_termino,
                    TIMESTAMPDIFF(
                        MINUTE,
                        IF(
                            cha_data_hora_abertura > cha_data_hora_atendimento,
                            cha_data_hora_abertura,
                            cha_data_hora_atendimento
                        ),
                        cha_data_hora_termino
                    ),
                    0
                )
            ) AS totalAnsweringTime,
            SUM(
                IF(
                    cha_data_hora_abertura < cha_data_hora_atendimento,
                    TIMESTAMPDIFF(MINUTE, cha_data_hora_abertura, cha_data_hora_atendimento),
                    0
                )
            ) AS totalLateTime
        FROM chamados
        LEFT JOIN acoes_chamados ON cha_acao = ach_id
        LEFT JOIN detratores ON ach_detrator = dtr_id
        WHERE
            cha_status = 3 AND
            cha_plano = 1 AND
            WEEK(cha_data_hora_abertura) = WEEK(NOW()) AND
            MONTH(cha_data_hora_abertura) = MONTH(NOW()) AND
            YEAR(cha_data_hora_abertura) = YEAR(NOW()) AND
            dtr_indicador > 0
    `;

    pool.query(query1, (err, rows1) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ error: 'Erro ao buscar os indicadores semanais.' });
        }

        let { totalCalls, totalAnsweringTime, totalLateTime } = rows1[0];
        totalAnsweringTime = totalAnsweringTime || 0;
        totalLateTime = totalLateTime || 0;

        let weeklyTotalCalls = totalCalls;
        let weeklyAvgAnswering = "00:00";
        let weeklyAvgLate = "00:00";

        if (totalCalls > 0) {
            let avgAnswering = Math.round(totalAnsweringTime / totalCalls);
            let avgLate = Math.round(totalLateTime / totalCalls);
            weeklyAvgAnswering = `${String(Math.floor(avgAnswering / 60)).padStart(2, '0')}:${String(avgAnswering % 60).padStart(2, '0')}`;
            weeklyAvgLate = `${String(Math.floor(avgLate / 60)).padStart(2, '0')}:${String(avgLate % 60).padStart(2, '0')}`;
        }

        const query2 = `
            SELECT SUM(pdp_total_horas * 60) AS totalHours
            FROM planos_de_producao
            WHERE
                WEEK(pdp_data) = WEEK(NOW()) AND
                MONTH(pdp_data) = MONTH(NOW()) AND
                YEAR(pdp_data) = YEAR(NOW())
        `;

        pool.query(query2, (err, rows2) => {
            if (err) {
                console.error('Erro:', err);
                return res.status(500).json({ error: 'Erro ao buscar os indicadores semanais.' });
            }

            let totalHours = rows2[0].totalHours || 0;
            let weeklyUpTime = "0.00%";

            if (totalHours > 0) {
                let uptime = 1 - ((totalAnsweringTime + totalLateTime) / totalHours);
                weeklyUpTime = `${(uptime * 100).toFixed(2)}%`;
            } else {
                weeklyUpTime = "100.00%";
            }

            res.json({
                weeklyTotalCalls,
                weeklyAvgAnswering,
                weeklyAvgLate,
                weeklyUpTime
            });
        });
    });
});

// Rota para obter os indicadores mensais de chamados
app.get('/api/indicadoresmensais', (req, res) => {
    const query1 = `
        SELECT
            COUNT(cha_id) AS totalCalls,
            SUM(
                IF(
                    cha_data_hora_abertura < cha_data_hora_termino,
                    TIMESTAMPDIFF(
                        MINUTE,
                        IF(
                            cha_data_hora_abertura > cha_data_hora_atendimento,
                            cha_data_hora_abertura,
                            cha_data_hora_atendimento
                        ),
                        cha_data_hora_termino
                    ),
                    0
                )
            ) AS totalAnsweringTime,
            SUM(
                IF(
                    cha_data_hora_abertura < cha_data_hora_atendimento,
                    TIMESTAMPDIFF(MINUTE, cha_data_hora_abertura, cha_data_hora_atendimento),
                    0
                )
            ) AS totalLateTime
        FROM chamados
        LEFT JOIN acoes_chamados ON cha_acao = ach_id
        LEFT JOIN detratores ON ach_detrator = dtr_id
        WHERE
            cha_status = 3 AND
            cha_plano = 1 AND
            MONTH(cha_data_hora_abertura) = MONTH(NOW()) AND
            YEAR(cha_data_hora_abertura) = YEAR(NOW()) AND
            dtr_indicador > 0
    `;

    pool.query(query1, (err, rows1) => {
        if (err) {
            console.error('Erro:', err);
            return res.status(500).json({ error: 'Erro ao buscar os indicadores semanais.' });
        }

        let { totalCalls, totalAnsweringTime, totalLateTime } = rows1[0];
        totalAnsweringTime = totalAnsweringTime || 0;
        totalLateTime = totalLateTime || 0;

        let monthlyTotalCalls = totalCalls;
        let monthlyAvgAnswering = "00:00";
        let monthlyAvgLate = "00:00";

        if (totalCalls > 0) {
            let avgAnswering = Math.round(totalAnsweringTime / totalCalls);
            let avgLate = Math.round(totalLateTime / totalCalls);
            monthlyAvgAnswering = `${String(Math.floor(avgAnswering / 60)).padStart(2, '0')}:${String(avgAnswering % 60).padStart(2, '0')}`;
            monthlyAvgLate = `${String(Math.floor(avgLate / 60)).padStart(2, '0')}:${String(avgLate % 60).padStart(2, '0')}`;
        }

        const query2 = `
            SELECT SUM(pdp_total_horas * 60) AS totalHours
            FROM planos_de_producao
            WHERE
                MONTH(pdp_data) = MONTH(NOW()) AND
                YEAR(pdp_data) = YEAR(NOW())
        `;

        pool.query(query2, (err, rows2) => {
            if (err) {
                console.error('Erro:', err);
                return res.status(500).json({ error: 'Erro ao buscar os indicadores semanais.' });
            }

            let totalHours = rows2[0].totalHours || 0;
            let monthlyUpTime = "0.00%";

            if (totalHours > 0) {
                let uptime = 1 - ((totalAnsweringTime + totalLateTime) / totalHours);
                monthlyUpTime = `${(uptime * 100).toFixed(2)}%`;
            } else {
                monthlyUpTime = "100.00%";
            }

            res.json({
                monthlyTotalCalls,
                monthlyAvgAnswering,
                monthlyAvgLate,
                monthlyUpTime
            });
        });
    });
});

// Função para verificar e notificar chamados atrasados
app.get('/api/notificacaochamadosatrasados', (req, res) => {
    const query = `
        SELECT 
            chamados.*,
            produtos.pro_nome AS produto_nome, 
            clientes.cli_nome AS cliente_nome, 
            tipos_chamado.tch_descricao AS tipo_chamado, 
            colaboradores.col_login AS responsavel,
            local_chamado.loc_nome AS cha_local,
            TIMESTAMPDIFF(MINUTE, cha_data_hora_abertura, NOW()) AS minutos_desde_abertura
        FROM 
            chamados
            LEFT JOIN produtos ON chamados.cha_produto = produtos.pro_id 
            LEFT JOIN clientes ON chamados.cha_cliente = clientes.cli_id 
            LEFT JOIN tipos_chamado ON cha_tipo = tch_id 
            LEFT JOIN atendimentos_chamados ON atendimentos_chamados.atc_chamado = cha_id 
            LEFT JOIN colaboradores ON atendimentos_chamados.atc_colaborador = colaboradores.col_id
            LEFT JOIN local_chamado ON cha_local = local_chamado.loc_id
        WHERE 
            cha_status < 2 AND
            cha_plano >= 0 AND cha_plano <= 1
    `;
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao verificar chamados atrasados:', err);
            return res.status(500).json({ message: 'Erro ao verificar chamados atrasados', error: err });
        }

        const chamadosAtrasados = result.filter(chamado => {
            const now = new Date();
            const previsao = new Date(chamado.cha_data_hora_abertura);
            previsao.setMinutes(previsao.getMinutes() + 1); // Adiciona 1 minuto
            return now > previsao;
        });

        if (chamadosAtrasados.length > 0) {
            io.emit('chamadosAtrasados', chamadosAtrasados);
        }

        res.json({chamadosAtrasados});
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