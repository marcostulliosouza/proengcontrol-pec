// /controllers/callController.js
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
}

module.exports = CallController;



