// /config/db.js
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || '10.161.100.11',
    user: process.env.DB_USER || 'bct_write',
    password: process.env.DB_PASSWORD || 'bct_write@',
    database: process.env.DB_DATABASE || 'better_call_test'
});

module.exports = pool;
