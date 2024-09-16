// /services/userService.js
// Aqui você pode definir funções para lidar com a lógica de usuários, como adicionar, editar e excluir.
const UserModel = require('../models/userModel');
// const { emitCallUpdate } = require('./socketService');

class UserService {
  // Obtém todos os chamados
  static async getAllUsers() {
    try {
      const users = await UserModel.getAllUsers();
      return users;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }
}
module.exports = UserService;