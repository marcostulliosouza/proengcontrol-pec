// backend/models/CallModel.js
const { query } = require('express');
const dbService = require('../services/dbService');

class CallModel {
    static async getAllCalls() {
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
            "colaboradores.col_login AS support",
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
            "atendimentos_chamados.atc_data_hora_termino IS NULL"
        ];

        const groupBy = ["chamados.cha_id"];

        const orderBy = [
            "chamados.cha_status DESC",
            "duracao_total DESC",
            "duracao_atendimento DESC"
        ];

        // Executa a consulta
        const calls = await dbService.select(fields, table, where, joins, groupBy, [], orderBy);

        return calls;
    }
    static async createCall(callData) {
        // Implementação para inserir um novo chamado no banco de dados
        const [result] = await dbService.insert('chamados', callData);
        const newCall = await this.getCallById(result.insertId); // Supondo que você tenha um método para obter um chamado por ID
        return newCall;
    }

    static async getIndicators(period) {
        try {
            let whereConditions = [];
            let periodCondition;

            switch (period) {
                case 'daily':
                    periodCondition = "DATE(chamados.cha_data_hora_abertura) = DATE(NOW())";
                    break;
                case 'weekly':
                    periodCondition = "WEEK(chamados.cha_data_hora_abertura) = WEEK(NOW()) AND MONTH(chamados.cha_data_hora_abertura) = MONTH(NOW()) AND YEAR(chamados.cha_data_hora_abertura) = YEAR(NOW())";
                    break;
                case 'monthly':
                    periodCondition = "MONTH(chamados.cha_data_hora_abertura) = MONTH(NOW()) AND YEAR(chamados.cha_data_hora_abertura) = YEAR(NOW())";
                    break;
                default:
                    throw new Error('Invalid period specified');
            }

            whereConditions.push("chamados.cha_status = 3", "chamados.cha_plano = 1", periodCondition, "detratores.dtr_indicador > 0");

            // Consultar os dados principais
            const fields = [
                "COUNT(chamados.cha_id) AS totalCalls",
                "SUM(IF(chamados.cha_data_hora_abertura < chamados.cha_data_hora_termino, TIMESTAMPDIFF(MINUTE, IF(chamados.cha_data_hora_abertura > chamados.cha_data_hora_atendimento, chamados.cha_data_hora_abertura, chamados.cha_data_hora_atendimento), chamados.cha_data_hora_termino), 0)) AS totalAnsweringTime",
                "SUM(IF(chamados.cha_data_hora_abertura < chamados.cha_data_hora_atendimento, TIMESTAMPDIFF(MINUTE, chamados.cha_data_hora_abertura, chamados.cha_data_hora_atendimento), 0)) AS totalLateTime"
            ];

            const table = "chamados";

            const joins = [
                { table: "acoes_chamados", on: "chamados.cha_acao = acoes_chamados.ach_id", type: " LEFT" },
                { table: "detratores", on: "acoes_chamados.ach_detrator = detratores.dtr_id", type: " LEFT" }
            ];

            const queryResult = await dbService.select(fields, table, whereConditions, joins);

            let indicators = {
                totalCalls: 0,
                avgAnswering: "00:00",
                avgLate: "00:00",
                upTime: "0,00%"
            };

            if (queryResult.length > 0) {
                const { totalCalls, totalAnsweringTime, totalLateTime } = queryResult[0];
                const avgAnswering = totalCalls > 0 ? Math.round(totalAnsweringTime / totalCalls) : 0;
                const avgLate = totalCalls > 0 ? Math.round(totalLateTime / totalCalls) : 0;

                indicators.totalCalls = totalCalls;
                indicators.avgAnswering = `${String(Math.floor(avgAnswering / 60)).padStart(2, '0')}:${String(avgAnswering % 60).padStart(2, '0')}`;
                indicators.avgLate = `${String(Math.floor(avgLate / 60)).padStart(2, '0')}:${String(avgLate % 60).padStart(2, '0')}`;
            }

            // Consultar o uptime
            const uptimeFields = ["SUM(planos_de_producao.pdp_total_horas * 60) AS totalMinutes"];
            const uptimeTable = 'planos_de_producao';
            const uptimeConditions = [`${periodCondition}`];

            // Executar a consulta para uptime
            const uptimeResult = await dbService.select(uptimeFields, uptimeTable, uptimeConditions);

            console.log("uptimeResult:", uptimeResult);

            if (uptimeResult.length > 0) {
                const totalMinutes = uptimeResult[0].totalMinutes || 0;
                if (totalMinutes > 0) {
                    const uptime = 1 - ((totalAnsweringTime + totalLateTime) / totalMinutes);
                    indicators.upTime = `${(uptime * 100).toFixed(2).replace('.', ',')}%`;
                } else {
                    indicators.upTime = "100,00%";
                }
            } else {
                indicators.upTime = "0,00%";
            }

            return indicators;

        } catch (error) {
            throw new Error(`Error fetching ${period} indicators: ${error.message}`);
        }
    }

    // static async setCallAsBeingAnswered(callId, idResponsible) {
    //     try {
    //         // Inserir o atendimento no banco de dados
    //         const table = "atendimentos_chamados";
    //         const fields = ["atc_chamado", "atc_colaborador", "atc_data_hora_inicio"];
    //         const values = [callId, idResponsible, "NOW()"];

    //         // Inserir o novo atendimento
    //         const [insertResult] = await dbService.insert(table, fields, values);

    //         if (!insertResult) {
    //             throw new Error("Falha ao tentar executar a inserção no banco.");
    //         }

    //         // Atualizar o chamado
    //         const updateTable = "chamados";
    //         const fieldsAndValues = [
    //             ["cha_status", "'2'"],
    //             ["cha_data_hora_atendimento", "NOW()"]
    //         ];
    //         const conditions = [
    //             `cha_id = '${callId}'`
    //         ];

    //         const [updateResult] = await dbService.update(updateTable, fieldsAndValues, conditions);

    //         if (!updateResult) {
    //             throw new Error("Falha ao tentar executar a atualização no banco.");
    //         }

    //         return { success: true };

    //     } catch (error) {
    //         throw new Error(`Error setting call as being answered: ${error.message}`);
    //     }
    // }

}

module.exports = CallModel;

