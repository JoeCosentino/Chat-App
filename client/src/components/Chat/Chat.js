import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import io from 'socket.io-client';

const Chat = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const search = useLocation().search;

    useEffect(() => {
        const name = new URLSearchParams(search).get('name');
        const room = new URLSearchParams(search).get('room');

        setName(name);
        setRoom(room);
    })

    return (
        <h1>Chat</h1>
    )
}

export default Chat;