// /controllers/callController.js
const CallService = require('../services/callService');

class CallController {
    static async getPaginatedCalls(req, res) {
        try {
            const { page = 1, pageSize = 10 } = req.query; // Parâmetros de paginação via query params
            const result = await CallService.getPaginatedCalls(parseInt(page), parseInt(pageSize));
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CallController;


