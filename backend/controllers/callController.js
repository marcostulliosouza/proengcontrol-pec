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
        console.log("setCallAsBeingAnswered called with callId:", req.params.callId);
        const callId = req.params.callId;
        const idResponsible = req.body.idResponsible;

        if (!callId || !idResponsible) {
            return res.status(400).json({ error: "Missing required parameters: callId or idResponsible" });
        }

        try {
            const setCall = await CallService.setCallAsBeingAnswered(callId, idResponsible);
            res.json(setCall);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


}

module.exports = CallController;
