// /services/socketService.js
/*WebSocket no servidor para que ele possa emitir eventos sempre que algo mudar.*/
let io = null;

const initializeSocket = (server) => {
    io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
};

const emitCallUpdate = (call) => {
    if (io) {
        // console.log('Emitting call update:', call); // Adicione este log para verificar
        io.emit('callUpdated', call);
    }
};

module.exports = { initializeSocket, emitCallUpdate };