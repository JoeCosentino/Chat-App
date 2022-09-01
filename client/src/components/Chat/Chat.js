import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import {io} from 'socket.io-client';

let socket;

const Chat = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';
    socket = io(ENDPOINT);

    const search = useLocation().search;

    useEffect(() => {
        const name = new URLSearchParams(search).get('name');
        const room = new URLSearchParams(search).get('room');

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {

        });

        return() => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, search]);

    return (
        <h1>Chat</h1>
    )
}

export default Chat;