// /services/callService.js
const CallModel = require('../models/callModel');

class CallService {
    static async getAllCalls() {
        return CallModel.getAllCalls();
    }
}

module.exports = CallService;


