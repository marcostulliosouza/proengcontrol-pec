// /services/dbService.js
const pool = require('../config/db');

const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            else resolve(connection);
        });
    });
};

const query = (connection, sql, values = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

const execute = async (sql, values) => {
    const connection = await getConnection();
    try {
        return await query(connection, sql, values);
    } finally {
        connection.release();
    }
};

const buildJoin = (joins = []) => {
    return joins.map(join => `${join.type || 'INNER'} JOIN ${join.table} ON ${join.on}`).join('  ');
};

const buildWhere = (conditions = []) => {
    return conditions.length ? ` WHERE ${conditions.join(' AND ')}` : '';
};

const where = (conditions = []) => {
    if (conditions.length === 0) {
        return '';
    }

    // Construir a WHERE clause corretamente
    const whereClause = conditions.map(([field, value]) => {
        // Escapar valores para evitar SQL Injection
        const escapedValue = typeof value === 'string' ? `'${value}'` : value;
        return `${field} = ${escapedValue}`;
    }).join(' AND ');

    return ` WHERE ${whereClause}`;
};

const buildGroupBy = (groupBy = []) => {
    return groupBy.length ? ` GROUP BY ${groupBy.join(', ')}` : '';
};

const buildOrderBy = (orderBy = []) => {
    return orderBy.length ? ` ORDER BY ${orderBy.join(', ')}` : '';
};

const select = async (fields, table, where = [], joins = [], groupBy = [], having = [], orderBy = [], limit = '', offset = '') => {
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

    // Obter conexão e executar a consulta
    const connection = await getConnection();
    try {
        return await query(connection, sql);
    } finally {
        connection.release();
    }
};

const update = async (table, fieldsAndValues, conditions = []) => {
    if (conditions.length === 0) {
        throw new Error('UPDATE query must have conditions to avoid affecting all rows.');
    }

    const setClause = fieldsAndValues.map(([field, value]) =>
        // Não usar ? para valores diretos como NOW()
        `${field} = ${value}`
    ).join(', ');
    const sql = `UPDATE ${table} SET ${setClause}${buildWhere(conditions)};`;

    console.log(sql);

    const connection = await getConnection();
    try {
        return await query(connection, sql);
    } finally {
        connection.release();
    }
};

const insert = async (table, fields) => {
    // Construir a consulta SQL
    const sql = `INSERT INTO ${table} (${fields.map(field => field[0]).join(', ')}) VALUES (${fields.map(field => field[1] === 'NOW()' ? 'NOW()' : '?').join(', ')})`;
    console.log(sql);

    // Extrair apenas os valores para o array de parâmetros, exceto para funções SQL como 'NOW()'
    const valuesArray = fields
        .filter(field => field[1] !== 'NOW()')  // Filtrar 'NOW()' para não ser passado como parâmetro
        .map(field => field[1]);

    const connection = await getConnection();
    try {
        return await query(connection, sql, valuesArray);
    } finally {
        connection.release();
    }
};


const count = async (table, where = []) => {
    const sql = `SELECT COUNT(*) AS total FROM ${table}${buildWhere(where)}`;

    const connection = await getConnection();
    try {
        const result = await query(connection, sql);
        return result[0];
    } finally {
        connection.release();
    }
};

const deleteQuery = async (table, conditions = []) => {
    if (conditions.length === 0) {
        throw new Error('DELETE query must have conditions to avoid affecting all rows.');
    }

    // Construir a cláusula WHERE corretamente
    const whereClause = where(conditions);

    // Montar a query DELETE
    const sql = `DELETE FROM ${table}${whereClause};`;
    console.log(sql);

    const connection = await getConnection();
    try {
        return await query(connection, sql);
    } finally {
        connection.release();
    }
};


module.exports = {
    select,
    update,
    insert,
    count,
    deleteQuery,
    getConnection,
    buildJoin,
    buildWhere,
    buildGroupBy,
    buildOrderBy,
    execute
};
