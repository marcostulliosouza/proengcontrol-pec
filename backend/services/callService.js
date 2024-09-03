// /services/callService.js
const CallModel = require('../models/callModel');

class CallService {
    static async getPaginatedCalls(page, pageSize) {
        return CallModel.getPaginatedCalls(page, pageSize);
    }
}

module.exports = CallService;



