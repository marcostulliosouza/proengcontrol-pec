const DetractorService = require('../services/detractorService');

class DetractorController {
  // Controller para carregar os detratores
  static async getDetractors(req, res) {
    try {
      const detType = req.query.detType ? parseInt(req.query.detType, 10) : null;
      const detractors = await DetractorService.loadDetractors(detType);
      res.status(200).json(detractors);
    } catch (error) {
      console.error(`Erro ao buscar detratores: ${error.message}`);
      res.status(500).json({ error: 'Erro ao carregar detratores' });
    }
  }
}

module.exports = DetractorController;
