// backend/models/detractorModel.js
const dbService = require('../services/dbService');

class DetractorModel {
  // Este método é chamado para carregar os detratores do banco de dados.
  // Se o parâmetro detType for passado ele selecionará os detratores
  // daquele tipo ou detratores sem tipo
  static async loadDetractors(detType = null) {
    try {
      const fields = [
        "dtr_id",
        "dtr_descricao",
        "dtr_tipo",
        "tch_descricao",
        "dtr_indicador"
      ];

      const table = "detratores";

      const joins = [
        { table: "tipos_chamado", on: "detratores.dtr_tipo = tipos_chamado.tch_id", type: "LEFT" }
      ];

      const where = [
        "dtr_ativo = 1"
      ];

      if (detType !== null) {
        where.push(`(dtr_tipo IS NULL OR dtr_tipo = ${detType})`);
      }

      const orderBy = [
        "dtr_descricao ASC"
      ];

      // Executa a consulta
      const detractors = await dbService.select(fields, table, where, joins, [], [], orderBy);

      return detractors;

    } catch (error) {
      console.error(`Erro ao carregar os detratores: ${error.message}`);
    }
  }
}

module.exports = DetractorModel;
