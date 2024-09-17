// ./services/detractorServices.js
const DetractorModel = require('../models/detractorModel');

class DetractorService {
  // Carrega os detratores usando o model
  static async loadDetractors(detType = null) {
    try {
      // Chama o método do model
      return await DetractorModel.loadDetractors(detType);
    } catch (error) {
      console.error(`Erro no service ao carregar detratores: ${error.message}`);
      throw new Error('Erro ao carregar detratores');
    }
  }
}

module.exports = DetractorService;
