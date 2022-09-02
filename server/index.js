const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const router = require('./router');

const {addUser, removeUser, getUser, getUserInRoom } = require('./users')

const PORT = process.env.PORT || 5000;



const socketio = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

socketio.on('connection', (socket) => {

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.join(user.room);
    })

    socket.on('disconnect', () => {
        console.log('user just left!!');
    });
});

app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));