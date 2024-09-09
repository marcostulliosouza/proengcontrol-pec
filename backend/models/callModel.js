// backend/models/CallModel.js
const dbService = require('../services/dbService');

class CallModel {
    static async getPaginatedCalls(page, pageSize) {
        const offset = (page - 1) * pageSize;

        const fields = [
            "chamados.cha_id",
            "chamados.cha_operador",
            "TIMESTAMPDIFF(MINUTE, chamados.cha_data_hora_abertura, NOW()) AS duracao_total",
            "IF(chamados.cha_status > 1, TIMESTAMPDIFF(MINUTE, chamados.cha_data_hora_atendimento, NOW()), 0) AS duracao_atendimento",
            "chamados.cha_tipo",
            "tipos_chamado.tch_descricao AS call_type",
            "clientes.cli_nome AS cha_cliente",
            "produtos.pro_nome AS cha_produto",
            "chamados.cha_DT",
            "chamados.cha_status",
            "status_chamado.stc_descricao AS status",
            "atendimentos_chamados.atc_colaborador AS support_id",
            "colaboradores.col_nome AS support",
            "chamados.cha_descricao",
            "chamados.cha_plano",
            "chamados.cha_data_hora_abertura",
            "chamados.cha_data_hora_atendimento",
            "chamados.cha_data_hora_termino",
            "local_chamado.loc_nome AS cha_local"
        ];

        const table = "chamados";

        const joins = [
            { table: "atendimentos_chamados", on: "chamados.cha_id = atendimentos_chamados.atc_chamado", type: " LEFT" },
            { table: "clientes", on: "chamados.cha_cliente = clientes.cli_id", type: " LEFT" },
            { table: "produtos", on: "chamados.cha_produto = produtos.pro_id", type: " LEFT" },
            { table: "colaboradores", on: "atendimentos_chamados.atc_colaborador = colaboradores.col_id", type: " LEFT" },
            { table: "tipos_chamado", on: "chamados.cha_tipo = tipos_chamado.tch_id", type: " LEFT" },
            { table: "status_chamado", on: "chamados.cha_status = status_chamado.stc_id", type: " LEFT" },
            { table: "local_chamado", on: "chamados.cha_local = local_chamado.loc_nome", type: " LEFT" }
        ];

        const where = [
            "chamados.cha_status = 1 OR chamados.cha_status = 2",
            // "atendimentos_chamados.atc_data_hora_termino IS NULL"
        ];

        const groupBy = ["chamados.cha_id"];

        const orderBy = [
            "chamados.cha_status DESC",
            "duracao_total DESC",
            "duracao_atendimento DESC"
        ];

        // Executa a consulta paginada
        const calls = await dbService.select(fields, table, where, joins, groupBy, [], orderBy, `${pageSize}`, `${offset}`);

        // Query para obter o número total de registros na tabela
        const totalCountQuery = await dbService.count(table, where, joins);
        const total = totalCountQuery.total;

        return {
            data: calls,
            total
        };
    }
}

module.exports = CallModel;
