// /services/dbService.js
const pool = require('../config/db');

const query = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);
            connection.query(sql, values, (err, results) => {
                connection.release();
                if (err) return reject(err);
                resolve(results);
            });
        });
    });
};

const select = (fields, table, where = [], groupBy = [], having = [], orderBy = [], limit = '', offset = '') => {
    let sql = `SELECT ${fields.join(', ')} FROM ${table}`;

    if (where.length) sql += ` WHERE ${where.join(' AND ')}`;
    if (groupBy.length) sql += ` GROUP BY ${groupBy.join(', ')}`;
    if (having.length) sql += ` HAVING ${having.join(' AND ')}`;
    if (orderBy.length) sql += ` ORDER BY ${orderBy.join(', ')}`;
    if (limit) sql += ` LIMIT ${limit}`;
    if (offset) sql += ` OFFSET ${offset}`;

    return query(sql);
};

const update = (table, fieldsAndValues, conditions) => {
    const setClause = fieldsAndValues.map(([field, value]) => `${field} = ?`).join(', ');
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${conditions.join(' AND ')}`;
    const values = fieldsAndValues.map(([, value]) => value);

    return query(sql, values);
};

const insert = (table, fields, values) => {
    const sql = `INSERT INTO ${table} (${fields.join(', ')}) VALUES ?`;
    return query(sql, [values]);
};

const count = (table) => {
    const sql = `SELECT COUNT(*) AS total FROM ${table}`;
    return query(sql).then(result => result[0]);
};

const deleteQuery = (table, conditions) => {
    const sql = `DELETE FROM ${table} WHERE ${conditions.join(' AND ')}`;
    return query(sql);
};

module.exports = {
    select,
    update,
    insert,
    count,
    deleteQuery
};
