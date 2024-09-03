const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const callRoutes = require('./routes/callRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rotas
app.use('/api', authRoutes); // Rotas de autenticação
app.use('/api', callRoutes); // Rotas de chamados

// Iniciando o servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor backend rodando em http://0.0.0.0:${PORT}`);
});
