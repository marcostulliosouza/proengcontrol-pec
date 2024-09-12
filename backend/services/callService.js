// ./sevices/callServices.js
const CallModel = require('../models/callModel');
const { emitCallUpdate } = require('./socketService');

class CallService {
    static async getAllCalls() {
        try {
            const calls = await CallModel.getAllCalls();
            return calls;
        } catch (error) {
            throw new Error('Error fetching calls');
        }
    }

    static async updateCall(callId, updateData) {
        try {
            const updatedCall = await CallModel.updateCall(callId, updateData);
            console.log('Emitting updated call:', updatedCall);
            emitCallUpdate(updatedCall);
            return updatedCall;
        } catch (error) {
            throw new Error('Error updating call');
        }
    }

    static async createCall(callData) {
        try {
            const newCall = await CallModel.createCall(callData);
            console.log('Emitting new call:', newCall);
            emitCallUpdate(newCall);
            return newCall;
        } catch (error) {
            throw new Error('Error creating call');
        }
    }

    static async getIndicators(period) {
        try {
            if (!['daily', 'weekly', 'monthly'].includes(period)) {
                throw new Error('Invalid period specified');
            }
            const indicators = await CallModel.getIndicators(period);
            return indicators;
        } catch (error) {
            throw new Error(`Error fetching ${period} indicators: ${error.message}`);
        }
    }

    static async setCallAsBeingAnswered(callId, idResponsible) {
        try {
            const result = await CallModel.setCallAsBeingAnswered(callId, idResponsible);
            console.log('Emitting updated call:', result);
            emitCallUpdate(result);
            return result;
        } catch (error) {
            throw new Error(`Error setting call as being answered: ${error.message}`);
        }
    }


}

module.exports = CallService;
