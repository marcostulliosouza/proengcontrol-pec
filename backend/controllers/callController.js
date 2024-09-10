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

    static async setCallAsBeingAnswered(req, res) {
        try {
            const callId = req.params.callId;
            const idResponsible = req.body.idResponsible;

            if (!callId || !idResponsible) {
                return res.status(400).json({ error: "Missing required parameters: callId or idResponsible" });
            }

            // Chama o serviço para definir o chamado como atendido
            const result = await CallService.setCallAsBeingAnswered(callId, idResponsible);

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CallController;
