// backend/models/CallModel.js
const dbService = require('../services/dbService');

class CallModel {
	static async getAllCalls() {
		try {
			const fields = [
				"chamados.cha_id",
				"chamados.cha_operador",
				"TIMESTAMPDIFF(MINUTE, chamados.cha_data_hora_abertura, NOW()) AS duracao_total",
				"IF(chamados.cha_status > 1, TIMESTAMPDIFF(MINUTE, chamados.cha_data_hora_atendimento, NOW()), 0) AS duracao_atendimento",
				"chamados.cha_tipo",
				"MAX(tipos_chamado.tch_descricao) AS call_type",
				"MAX(clientes.cli_nome) AS cha_cliente",
				"MAX(produtos.pro_nome) AS cha_produto",
				"chamados.cha_DT",
				"chamados.cha_status",
				"MAX(status_chamado.stc_descricao) AS status",
				"MAX(atendimentos_chamados.atc_colaborador) AS support_id",
				"MAX(colaboradores.col_login) AS support",
				"MAX(chamados.cha_descricao) AS cha_descricao",
				"MAX(chamados.cha_plano) AS cha_plano",
				"MAX(chamados.cha_data_hora_abertura) AS cha_data_hora_abertura",
				"MAX(chamados.cha_data_hora_atendimento) AS cha_data_hora_atendimento",
				"MAX(chamados.cha_data_hora_termino) AS cha_data_hora_termino",
				"MAX(local_chamado.loc_nome) AS cha_local"
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

		} catch (error) {
			console.error(`Error ao carregar os chamados: ${error.message}`);
		}

	}

	// // 	// Implementação para inserir um novo chamado no banco de dados
	// // 	const [result] = await dbService.insert('chamados', callData);
	// // 	const newCall = await this.getCallById(result.insertId); // Supondo que você tenha um método para obter um chamado por ID
	// // 	return newCall;
	// // }

	// // static async getIndicators(period) {
	// // 	try {
	// // 		let whereConditions = [];
	// // 		let periodCondition;

	// // 		switch (period) {
	// // 			case 'daily':
	// // 				periodCondition = "DATE(chamados.cha_data_hora_abertura) = DATE(NOW())";
	// // 				break;
	// // 			case 'weekly':
	// // 				periodCondition = "WEEK(chamados.cha_data_hora_abertura) = WEEK(NOW()) AND MONTH(chamados.cha_data_hora_abertura) = MONTH(NOW()) AND YEAR(chamados.cha_data_hora_abertura) = YEAR(NOW())";
	// // 				break;
	// // 			case 'monthly':
	// // 				periodCondition = "MONTH(chamados.cha_data_hora_abertura) = MONTH(NOW()) AND YEAR(chamados.cha_data_hora_abertura) = YEAR(NOW())";
	// // 				break;
	// // 			default:
	// // 				throw new Error('Invalid period specified');
	// // 		}

	// // 		whereConditions.push("chamados.cha_status = 3", "chamados.cha_plano = 1", periodCondition, "detratores.dtr_indicador > 0");

	// // 		// Consultar os dados principais
	// // 		const fields = [
	// // 			"COUNT(chamados.cha_id) AS totalCalls",
	// // 			"SUM(IF(chamados.cha_data_hora_abertura < chamados.cha_data_hora_termino, TIMESTAMPDIFF(MINUTE, IF(chamados.cha_data_hora_abertura > chamados.cha_data_hora_atendimento, chamados.cha_data_hora_abertura, chamados.cha_data_hora_atendimento), chamados.cha_data_hora_termino), 0)) AS totalAnsweringTime",
	// // 			"SUM(IF(chamados.cha_data_hora_abertura < chamados.cha_data_hora_atendimento, TIMESTAMPDIFF(MINUTE, chamados.cha_data_hora_abertura, chamados.cha_data_hora_atendimento), 0)) AS totalLateTime"
	// // 		];

	// // 		const table = "chamados";

	// // 		const joins = [
	// // 			{ table: "acoes_chamados", on: "chamados.cha_acao = acoes_chamados.ach_id", type: " LEFT" },
	// // 			{ table: "detratores", on: "acoes_chamados.ach_detrator = detratores.dtr_id", type: " LEFT" }
	// // 		];

	// // 		const queryResult = await dbService.select(fields, table, whereConditions, joins);

	// // 		let indicators = {
	// // 			totalCalls: 0,
	// // 			avgAnswering: "00:00",
	// // 			avgLate: "00:00",
	// // 			upTime: "0,00%"
	// // 		};

	// // 		if (queryResult.length > 0) {
	// // 			const { totalCalls, totalAnsweringTime, totalLateTime } = queryResult[0];
	// // 			const avgAnswering = totalCalls > 0 ? Math.round(totalAnsweringTime / totalCalls) : 0;
	// // 			const avgLate = totalCalls > 0 ? Math.round(totalLateTime / totalCalls) : 0;

	// // 			indicators.totalCalls = totalCalls;
	// // 			indicators.avgAnswering = `${String(Math.floor(avgAnswering / 60)).padStart(2, '0')}:${String(avgAnswering % 60).padStart(2, '0')}`;
	// // 			indicators.avgLate = `${String(Math.floor(avgLate / 60)).padStart(2, '0')}:${String(avgLate % 60).padStart(2, '0')}`;
	// // 		}

	// // 		// Consultar o uptime
	// // 		const uptimeFields = ["SUM(planos_de_producao.pdp_total_horas * 60) AS totalMinutes"];
	// // 		const uptimeTable = 'planos_de_producao';
	// // 		const uptimeConditions = [`${periodCondition}`];

	// // 		// Executar a consulta para uptime
	// // 		const uptimeResult = await dbService.select(uptimeFields, uptimeTable, uptimeConditions);

	// // 		console.log("uptimeResult:", uptimeResult);

	// // 		if (uptimeResult.length > 0) {
	// // 			const totalMinutes = uptimeResult[0].totalMinutes || 0;
	// // 			if (totalMinutes > 0) {
	// // 				const uptime = 1 - ((totalAnsweringTime + totalLateTime) / totalMinutes);
	// // 				indicators.upTime = `${(uptime * 100).toFixed(2).replace('.', ',')}%`;
	// // 			} else {
	// // 				indicators.upTime = "100,00%";
	// // 			}
	// // 		} else {
	// // 			indicators.upTime = "0,00%";
	// // 		}

	// // 		return indicators;

	// // 	} catch (error) {
	// // 		throw new Error(`Error fetching ${period} indicators: ${error.message}`);
	// // 	}
	// // }

	// // Atender Chamado
	// static async setCallAsBeingAnswered(callId, idResponsible) {
	// 	try {
	// 		// Inserir o atendimento no banco de dados
	// 		const table = "atendimentos_chamados";
	// 		const fields = ["atc_chamado", "atc_colaborador", "atc_data_hora_inicio"];
	// 		const values = [callId, idResponsible];  // Remover 'NOW()' dos valores e usar diretamente na consulta

	// 		// Inserir o novo atendimento
	// 		await dbService.insert(table, fields, [...values, new Date()]); // Passar a data atual

	// 		// Atualizar o chamado
	// 		const updateTable = "chamados";
	// 		const fieldsAndValues = [
	// 			["cha_status", "2"],
	// 			["cha_data_hora_atendimento", "NOW()"] // Usar a função NOW() diretamente na consulta SQL
	// 		];
	// 		const conditions = [
	// 			`cha_id = ${callId}`
	// 		];

	// 		const updateResult = await dbService.update(updateTable, fieldsAndValues, conditions);
	// 		if (!updateResult) {
	// 			console.error("Falha ao tentar executar a atualização no banco.");
	// 		}

	// 		return { success: true };

	// 	} catch (error) {
	// 		console.error(`Error ao atender o chamado: ${error.message}`);
	// 	}
	// }


	// Desistir do Chamado
	// static async giveUpFromCall(callID, idResponsible) {
	// 	try {
	// 		const table = "atendimentos_chamados";
	// 		const conditions = [
	// 			`atc_chamado = "${callID}"`
	// 		];

	// 		// Deletando o atendimento do chamado
	// 		const [deleteResult] = await dbService.deleteQuery(table, conditions);

	// 		if (!deleteResult) {
	// 			throw new Error("Falha ao tentar desistir do chamado no banco.")
	// 		} else {
	// 			// Atualizando o chamado
	// 			const updateTable = "chamados";
	// 			const fieldsAndValues = [
	// 				["cha_status", "1"],
	// 				["cha_data_hora_termino", "NULL"],
	// 				["cha_visualizado", "0"]
	// 			];
	// 			const conditions = [
	// 				`cha_id = ${this.callID}`
	// 			];

	// 			const [updateResult] = await dbService.update(updateTable, fieldsAndValues, conditions);

	// 			if (!updateResult) {
	// 				console.error("Falha ao tentar executar a atualização no banco");
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error(`Error setting call as give up from call: ${error.message}`);
	// 	}
	// }

	// Fechar Chamado
	static async closeCall(callID, detractorID, actionTaked) {
		try {
			const table = "atendimentos_chamados"
			const fieldsAndValues = [
				["atc_data_hora_termino", "NOW()"]
			];
			const conditions = [
				`atc_chamado = "${callID}"`,
				"atc_data_hora_termino IS NULL"
			];

			const [] = dbService
		} catch (error) {
			console.error(`Error ao fechar o chamado: ${error.message}`);
		}
	}

	// Essa função irá calcular e atualizar a duração total do chamado 
	// e a duração do atendimento, se já houver um atendimento em 
	// andamento.A função faz isso calculando a diferença entre a 
	// hora de abertura e a hora atual.

	static async updateDuration(callID) {
		try {
			const fields = [
				"TIMESTAMPDIFF(MINUTE, cha_data_hora_abertura, NOW()) AS duracao_total",
				"IF(cha_status > 1, TIMESTAMPDIFF(MINUTE, cha_data_hora_atendimento, NOW()), 0) AS duracao_atendimento"
			];
			const table = "chamados";
			const where = [`cha_id = "${callID}"`];

			const result = await dbService.select(fields, table, where);

			if (result.length > 0) {
				const { duracao_total, duracao_atendimento } = result[0];

				// Formatar duração (opcional)
				return {
					totalDuration: `${Math.floor(duracao_total / 60)}h ${duracao_total % 60}m`,
					attendingDuration: `${Math.floor(duracao_atendimento / 60)}h ${duracao_atendimento % 60}m`
				};
			}

			return null;
		} catch (error) {
			console.error(`Error updating duration for call ${callID}: ${error.message}`);
		}
	}

	// Essa função transfere o chamado de um usuário para outro, 
	// encerrando o atendimento do usuário atual e criando 
	// um novo registro para o novo usuário.

	static async transferCallFromTo(callID, oldUser, newUser) {
		try {
			// Encerrar o atendimento do antigo operador
			const table = "atendimentos_chamados";
			const fieldsAndValues = [["atc_data_hora_termino", "NOW()"]];
			const conditions = [`atc_chamado = "${callID}"`, `atc_colaborador = "${oldUser}"`, "atc_data_hora_termino IS NULL"];
			await dbService.update(table, fieldsAndValues, conditions);

			// Criar um novo registro para o novo operador
			const newFieldsAndValues = [
				["atc_chamado", `"${callID}"`],
				["atc_colaborador", `"${newUser}"`],
				["atc_data_hora_inicio", "NOW()"]
			];
			await dbService.insert(table, newFieldsAndValues);

		} catch (error) {
			console.error(`Error transferring call ${callID} from ${oldUser} to ${newUser}: ${error.message}`);
		}
	}

	// Essa função atualiza os dados do chamado, como status, duração, 
	// responsável, e datas.Realiza uma consulta ao banco e 
	// atualiza os campos relevantes.

	static async updateCallData(callID, updates) {
		try {
			const table = "chamados";
			const fieldsAndValues = Object.entries(updates);  // updates: { column: value }
			const conditions = [`cha_id = "${callID}"`];

			await dbService.update(table, fieldsAndValues, conditions);
		} catch (error) {
			console.error(`Error updating call data for call ${callID}: ${error.message}`);
		}
	}

	// Essa função atualiza as 
	// datas de início e término do chamado no banco de dados.
	static async changeCallDateTimes(callID, beginningDate, endDate) {
		try {
			const table = "chamados";
			const fieldsAndValues = [
				["cha_data_hora_abertura", `"${beginningDate}"`],
				["cha_data_hora_termino", `"${endDate}"`]
			];
			const conditions = [`cha_id = "${callID}"`];

			await dbService.update(table, fieldsAndValues, conditions);
		} catch (error) {
			console.error(`Error changing call dates for call ${callID}: ${error.message}`);
		}
	}

	// Essa função trava ou destrava um chamado, 
	// indicando se o chamado está sendo visualizado por outro usuário.
	static async lockCall(callID, lock = true) {
		try {
			const table = "chamados";
			const fieldsAndValues = [["cha_visualizado", lock ? "1" : "0"]];
			const conditions = [`cha_id = "${callID}"`];

			await dbService.update(table, fieldsAndValues, conditions);
		} catch (error) {
			console.error(`Error ${lock ? 'locking' : 'unlocking'} call ${callID}: ${error.message}`);
		}
	}

	// Essa função verifica se o chamado está bloqueado.
	static async isLockedCall(callID) {
		try {
			const fields = ["cha_visualizado"];
			const table = "chamados";
			const where = [`cha_id = "${callID}"`];

			const result = await dbService.select(fields, table, where);
			return result.length > 0 ? result[0].cha_visualizado === 1 : false;
		} catch (error) {
			console.error(`Error checking if call ${callID} is locked: ${error.message}`);
		}
	}

	// Essa função define um responsável pelo atendimento do 
	// chamado e atualiza o status e a hora de início do atendimento.

	static async setCallAsBeingAnswered(callID, idResponsible) {
		try {
			// Atualizar o status e o responsável pelo chamado
			await CallModel.updateCallData(callID, {
				cha_status: 2,  // Em atendimento
				cha_data_hora_atendimento: "NOW()"
			});

			// Registrar o atendimento do responsável
			const table = "atendimentos_chamados";
			const fieldsAndValues = [
				["atc_chamado", `"${callID}"`],
				["atc_colaborador", `"${idResponsible}"`],
				["atc_data_hora_inicio", "NOW()"]
			];
			await dbService.insert(table, fieldsAndValues);

		} catch (error) {
			console.error(`Error setting call ${callID} as being answered by ${idResponsible}: ${error.message}`);
		}
	}

	// Permite que um usuário desista do atendimento de um chamado, 
	// removendo o registro de atendimento e redefinindo o status.
	static async giveUpFromCall(callID, idResponsible) {
		if (!callID || !idResponsible) {
			throw new Error('Missing parameters: callID and idResponsible are required.');
		}

		try {
			const query = 'UPDATE calls SET status = ?, responsible = ? WHERE id = ?';
			const values = ['DROPPED', idResponsible, callID];
			const [result] = await db.execute(query, values);
			return result;
		} catch (error) {
			throw new Error('Database error: ' + error.message);
		}
	}

	// Essa função retorna a descrição do detrator e 
	// a ação tomada para resolver o chamado.

	static async getActionTaken(callID) {
		try {
			const fields = [
				"detratores.dtr_descricao AS detractor",
				"acoes_chamados.ach_acao AS actionTaken"
			];
			const table = "chamados";

			const joins = [
				{ table: "detratores", on: "chamados.cha_detrator = detratores.dtr_id", type: " LEFT" },
				{ table: "acoes_chamados", on: "chamados.cha_id = acoes_chamados.ach_chamado", type: " LEFT" }
			];

			const where = [`chamados.cha_id = "${callID}"`];

			const result = await dbService.select(fields, table, where, joins);

			return result.length > 0 ? result[0] : null;
		} catch (error) {
			console.error(`Error fetching action taken for call ${callID}: ${error.message}`);
		}
	}
}

module.exports = CallModel;

