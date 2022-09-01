const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


const router = require('./router');

const PORT = process.env.PORT || 5000;



const socketio = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

socketio.on('connection', (socket) => {
    console.log('we have a new connection!!!');

    socket.on('disconnection', () => {
        console.log('user just left!!');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));