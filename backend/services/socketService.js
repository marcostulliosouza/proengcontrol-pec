// /services/socketService.js
const socketIO = require('socket.io');
let io;

function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: '*', // Defina a origem permitida para o frontend
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('Novo cliente conectado:', socket.id);

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
}

const emitCallUpdate = (callData) => {
    if (io) {
        // console.log('Emitting call update:', call); // Adicione este log para verificar
        io.emit('callsUpdated', callData);
    }
};

module.exports = { initializeSocket, emitCallUpdate };