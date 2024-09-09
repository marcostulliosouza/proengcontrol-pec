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

const buildJoin = (joins = []) => {
    return joins.map(join => `${join.type || 'INNER'} JOIN ${join.table} ON ${join.on}`).join('  ');
};

const buildWhere = (conditions = []) => {
    return conditions.length ? ` WHERE ${conditions.join(' AND ')}` : '';
};

const buildGroupBy = (groupBy = []) => {
    return groupBy.length ? ` GROUP BY ${groupBy.join(', ')}` : '';
};

const buildOrderBy = (orderBy = []) => {
    return orderBy.length ? ` ORDER BY ${orderBy.join(', ')}` : '';
};

const select = (fields, table, where = [], joins = [], groupBy = [], having = [], orderBy = [], limit = '', offset = '') => {
    let sql = `SELECT ${fields.join(', ')} FROM ${table}`;
    sql += buildJoin(joins);
    sql += buildWhere(where);
    sql += buildGroupBy(groupBy);
    if (having.length) sql += ` HAVING ${having.join(' AND ')}`;
    sql += buildOrderBy(orderBy);
    if (limit) {
        sql += ` LIMIT ${limit}`;
        if (offset) sql += ` OFFSET ${offset}`;
    }

    return query(sql);
};

const update = (table, fieldsAndValues, conditions = []) => {
    if (conditions.length === 0) {
        throw new Error('UPDATE query must have conditions to avoid affecting all rows.');
    }

    const setClause = fieldsAndValues.map(([field, value]) => `${field} = ?`).join(', ');
    const sql = `UPDATE ${table} SET ${setClause}${buildWhere(conditions)}`;
    const values = fieldsAndValues.map(([, value]) => value);

    return query(sql, values);
};

const insert = (table, fields, values) => {
    if (!fields.length || !values.length) {
        throw new Error('Fields and values must be provided for INSERT query.');
    }

    const sql = `INSERT INTO ${table} (${fields.join(', ')}) VALUES ?`;
    return query(sql, [values]);
};

const count = (table, where = []) => {
    const sql = `SELECT COUNT(*) AS total FROM ${table}${buildWhere(where)}`;
    return query(sql).then(result => result[0]);
};

const deleteQuery = (table, conditions = []) => {
    if (conditions.length === 0) {
        throw new Error('DELETE query must have conditions to avoid affecting all rows.');
    }

    const sql = `DELETE FROM ${table}${buildWhere(conditions)}`;
    return query(sql);
};

module.exports = {
    select,
    update,
    insert,
    count,
    deleteQuery,
    buildJoin,
    buildWhere,
    buildGroupBy,
    buildOrderBy
};
