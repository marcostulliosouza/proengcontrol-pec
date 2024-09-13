// ./services/callServices.js
const CallModel = require('../models/callModel');
const { emitCallUpdate } = require('./socketService');

class CallService {
    // Obtém todos os chamados
    static async getAllCalls() {
        try {
            const calls = await CallModel.getAllCalls();
            return calls;
        } catch (error) {
            throw new Error('Error fetching calls: ' + error.message);
        }
    }

    // Define um chamado como em atendimento
    static async setCallAsBeingAnswered(callId, idResponsible) {
        try {
            const result = await CallModel.setCallAsBeingAnswered(callId, idResponsible);
            console.log('Emitting updated call:', result);
            emitCallUpdate(result);
            return result;
        } catch (error) {
            throw new Error('Error setting call as being answered: ' + error.message);
        }
    }

    // Desiste de um chamado
    static async giveUpFromCall(callID, idResponsible) {
        if (!callID || !idResponsible) {
            throw new Error('Missing parameters: callID and idResponsible are required.');
        }

        try {
            const result = await CallModel.giveUpFromCall(callID, idResponsible);
            console.log('Emitting updated call:', result);
            emitCallUpdate(result);
            return result;
        } catch (error) {
            throw new Error('Error giving up from call: ' + error.message);
        }
    }

    // Fecha um chamado
    static async closeCall(callID, detractorID, actionTaked) {
        try {
            const result = await CallModel.closeCall(callID, detractorID, actionTaked);
            console.log('Emitting updated call:', result);
            emitCallUpdate(result);
            return result;
        } catch (error) {
            throw new Error('Error closing call: ' + error.message);
        }
    }

    // Atualiza a duração de um chamado
    static async updateDuration(callID) {
        try {
            const duration = await CallModel.updateDuration(callID);
            return duration;
        } catch (error) {
            throw new Error('Error updating duration: ' + error.message);
        }
    }

    // Transfere um chamado de um usuário para outro
    static async transferCallFromTo(callID, oldUser, newUser) {
        try {
            const result = await CallModel.transferCallFromTo(callID, oldUser, newUser);
            console.log('Emitting updated call:', result);
            emitCallUpdate(result);
            return result;
        } catch (error) {
            throw new Error('Error transferring call: ' + error.message);
        }
    }

    // Atualiza os dados do chamado
    static async updateCallData(callID, updates) {
        try {
            const result = await CallModel.updateCallData(callID, updates);
            console.log('Emitting updated call:', result);
            emitCallUpdate(result);
            return result;
        } catch (error) {
            throw new Error('Error updating call data: ' + error.message);
        }
    }

    // Altera as datas de início e término do chamado
    static async changeCallDateTimes(callID, beginningDate, endDate) {
        try {
            const result = await CallModel.changeCallDateTimes(callID, beginningDate, endDate);
            console.log('Emitting updated call:', result);
            emitCallUpdate(result);
            return result;
        } catch (error) {
            throw new Error('Error changing call dates: ' + error.message);
        }
    }

    // Trava ou destrava um chamado
    static async lockCall(callID, lock = true) {
        try {
            const result = await CallModel.lockCall(callID, lock);
            console.log('Emitting updated call:', result);
            emitCallUpdate(result);
            return result;
        } catch (error) {
            throw new Error('Error locking/unlocking call: ' + error.message);
        }
    }

    // Verifica se o chamado está bloqueado
    static async isLockedCall(callID) {
        try {
            const isLocked = await CallModel.isLockedCall(callID);
            return isLocked;
        } catch (error) {
            throw new Error('Error checking if call is locked: ' + error.message);
        }
    }

    // Obtém a ação tomada e o detrator
    static async getActionTaken(callID) {
        try {
            const action = await CallModel.getActionTaken(callID);
            return action;
        } catch (error) {
            throw new Error('Error fetching action taken: ' + error.message);
        }
    }
}

module.exports = CallService;