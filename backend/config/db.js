// /config/db.js
// const mysql = require('mysql');
const mysql = require('mysql2'); // Substitua 'mysql' por 'mysql2'
require('dotenv').config();  // Carrega as variáveis do arquivo .env

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports = pool;
