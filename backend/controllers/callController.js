// backend/controllers/callController.js
const CallService = require('../services/callService');

class CallController {
    static async getAllCalls(req, res) {
        try {
            const calls = await CallService.getAllCalls();
            res.json(calls);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getIndicators(req, res) {
        try {
            const period = req.params.period;
            const indicators = await CallService.getIndicators(period);
            res.json(indicators);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CallController;
