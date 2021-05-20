import './Menu.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import configurations from './configurations';
import socketIOClient from 'socket.io-client';
import { CreateSocket } from './Actions/action';
import {CreateGame} from './Actions/action';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Drawer, Fab } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import Friends from './Friends';
import axios from 'axios';


function Menu(props) {
    const chats = useSelector(state => state.chatsList);
    const dispatch = useDispatch();
    const history = useHistory();
    let socket = useSelector(state => state.socketIO);
    const [isDrawOpen, setIsDrawOpen] = useState(false);

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
            newSocket.on('messageRecieved', async message => {
                let chat;
                chats.forEach(chatData => {
                    if(props.user == chatData.userId) chat.message.push(); // TODO: FIX
                });
            
                if(!chat) chat = await GetChatData();

                console.log(chat);
            })
        }
    }, []);

    const GetChatData = () => {
        return new Promise((resolve) => {
            axios.get(configurations.server + 'getChatData', {withCredentials: true}).then(result =>{
                resolve(result.data);
            }).catch(err => console.log(err));
        })
    }

    const requestRandomGame = () => {
        socket.emit('requestRandomGame');
    }

    return (
    <div className="menu-container">
        <Drawer width="200px" open={isDrawOpen} onBackdropClick={() => setIsDrawOpen(false)}>
                <Friends></Friends>
        </Drawer>
        <Fab onClick={() => setIsDrawOpen(!isDrawOpen)}>
            <PeopleIcon></PeopleIcon>
        </Fab>
        <div className="menu-main-grid">
            <div className="align-center justify-space">
                <div className="menu-small-button">
                    <Button variant="contained" fullWidth="true">
                        <div>Search friends</div>
                    </Button>
                </div>
            </div>
            <div className="align-center justify-space">
                <div className="menu-big-button">
                    <Button color="primary" variant="contained" fullWidth="true">
                        <div>Join Game</div>
                    </Button>
                </div>
            </div>
            <div className="align-center justify-space">
                <div className="menu-small-button">
                    <Button variant="contained" fullWidth="true">
                        <AccountCircleSharpIcon></AccountCircleSharpIcon>
                        <div>Profile</div>
                    </Button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Menu;