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

    static async changeCallDateTimes(req, res) {
        const { callID } = req.params;
        const { beginningDate, endDate } = req.body;

        try {
            if (!callID || !beginningDate || !endDate) {
                return res.status(400).json({ error: 'Missing required parameters: callID, beginningDate, endDate' });
            }

            await CallService.changeCallDateTimes(callID, beginningDate, endDate);
            res.json({ message: 'Call date times updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCallById(req, res) {
        const { callID } = req.params;
        try {
            const call = await CallService.getCallById(callID);
            if (call) {
                res.json(call);
            } else {
                res.status(404).json({ message: 'Call not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createCall(req, res) {
        const callData = req.body;
        try {
            const newCall = await CallService.createCall(callData);
            res.status(201).json(newCall);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateCall(req, res) {
        const { callID } = req.params;
        const updates = req.body;
        try {
            const updatedCall = await CallService.updateCall(callID, updates);
            if (updatedCall) {
                res.json(updatedCall);
            } else {
                res.status(404).json({ message: 'Call not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteCall(req, res) {
        const { callID } = req.params;
        try {
            const result = await CallService.deleteCall(callID);
            if (result.affectedRows > 0) {
                res.json({ message: 'Call deleted successfully' });
            } else {
                res.status(404).json({ message: 'Call not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async setCallAsBeingAnswered(req, res) {
        const { callID } = req.params;
        const { idResponsible } = req.body; // Verifique se está vindo do corpo da requisição

        try {
            // Verifique se callID e idResponsible estão definidos
            if (!callID || !idResponsible) {
                return res.status(400).json({ error: 'Missing required parameters' });
            }

            await CallService.setCallAsBeingAnswered(callID, idResponsible);
            res.json({ message: 'Call set as being answered successfully' });
        } catch (error) {
            console.error('Error setting call:', error);
            res.status(500).json({ error: error.message });
        }
    }


    static async giveUpFromCall(req, res) {
        const { callID } = req.params;
        const { idResponsible } = req.body;

        try {
            await CallService.giveUpFromCall(callID, idResponsible);
            res.json({ message: 'Successfully gave up from call' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async closeCall(req, res) {
        const { callID } = req.params;
        const { detractorID, actionTaked } = req.body;
        try {
            await CallService.closeCall(callID, detractorID, actionTaked);
            res.json({ message: 'Call closed successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async transferCallFromTo(req, res) {
        const { callID } = req.params;
        const { oldUser, newUser } = req.body;
        try {
            await CallService.transferCallFromTo(callID, oldUser, newUser);
            res.json({ message: 'Call transferred successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateDuration(req, res) {
        const { callID } = req.params;
        try {
            const duration = await CallService.updateDuration(callID);
            if (duration) {
                res.json(duration);
            } else {
                res.status(404).json({ message: 'Call not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async lockCall(req, res) {
        const { callID } = req.params;
        const { lock } = req.body;
        try {
            await CallService.lockCall(callID, lock);
            res.json({ message: lock ? 'Call locked successfully' : 'Call unlocked successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async isLockedCall(req, res) {
        const { callID } = req.params;
        try {
            const isLocked = await CallService.isLockedCall(callID);
            res.json({ isLocked });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getActionTaken(req, res) {
        const { callID } = req.params;
        try {
            const actionTaken = await CallService.getActionTaken(callID);
            if (actionTaken) {
                res.json(actionTaken);
            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CallController;
