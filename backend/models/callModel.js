// /models/CallModel.js
const { off } = require('../config/db');
const dbService = require('../services/dbService');

class CallModel {
    static async getPaginatedCalls(page, pageSize) {
        const offset = (page - 1) * pageSize;
        const fields = [
            "cha_id", "cha_cliente", "cha_data_hora_abertura", "cha_data_hora_atendimento",
            "cha_data_hora_termino", "cha_descricao", "cha_DT", "cha_local",
            "cha_operador", "cha_plano", "cha_produto", "cha_status", "cha_tipo",
            "cha_visualizado"
        ];

        const table = "chamados";
        const orderBy = ["cha_data_hora_abertura DESC"];
        const limit = `${pageSize} OFFSET ${offset}`;

        const calls = await dbService.select(fields, table, [], [], [], orderBy, limit);
        // Query para obter o número total de registros na tabela
        const totalCountQuery = await dbService.count(table);
        const total = totalCountQuery
        return {
            data: calls,
            total
        };
    }
}

module.exports = CallModel;


