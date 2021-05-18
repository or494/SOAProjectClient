import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import configurations from './configurations';
import socketIOClient from 'socket.io-client';
import { CreateSocket } from './Actions/action';
import {CreateGame} from './Actions/action';
import { useHistory } from 'react-router';

function Menu(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    let socket = useSelector(state => state.socketIO);

    useEffect(() => {
        if(socket == null){
            const newSocket = socketIOClient(configurations.server, {
                withCredentials: true
            });
            dispatch(CreateSocket(newSocket));
            // socket events
            socket = newSocket;
            newSocket.on('waitInQueue', result => {
                console.log('waiting in queue');
            });
            newSocket.on('joinGame', gameObject => {
                dispatch(CreateGame(gameObject));
                console.log('joining game');
                history.push('/game');
            })
        }
    }, []);

    const requestRandomGame = () => {
        socket.emit('requestRandomGame');
    }

    return (
        <div>
            <button onClick={requestRandomGame}>Join game</button>
        </div>
    );
}

export default Menu;