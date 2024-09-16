// backend/models/userModel.js
const dbService = require('../services/dbService');

class UserModel {

  static async getAllUsers() {
    try {
      const fields = [
        "col_id",
        "col_nome",
        "col_login",
        "COUNT(*)"
      ];

      const table = "colaboradores";

      const joins = [];

      const where = [
        "colaboradores.col_ativo = 1"
      ];

      const groupBy = [
        "colaboradores.col_nome",
        "colaboradores.col_id"
      ];

      const orderBy = [
        "colaboradores.col_nome ASC"
      ];

      // Executa a consulta
      const users = await dbService.select(fields, table, where, [], groupBy, [], orderBy);

      return users;

    } catch (error) {
      console.error(`Error ao carregar os chamados: ${error.message}`);
    }

  }

}
module.exports = UserModel;