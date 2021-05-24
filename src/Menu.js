import './Menu.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import configurations from './configurations';
import socketIOClient from 'socket.io-client';
import { AddFriendToList, AddMessageToState, CreateSocket, SaveUserId, ChangeIsConnected } from './Actions/action';
import {CreateGame} from './Actions/action';
import { useHistory } from 'react-router';
import { Button, Snackbar } from '@material-ui/core';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { Drawer, Fab } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import Friends from './Friends';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

function Menu(props) {
    const chats = useSelector(state => state.chatsList);
    const friends = useSelector(state => state.friendsList);
    const dispatch = useDispatch();
    const history = useHistory();
    let socket = useSelector(state => state.socketIO);
    const [isDrawOpen, setIsDrawOpen] = useState(false);
    const [isInvited, setIsInvited] = useState(false);
    const [gameInvitation, setGameInvitation] = useState();
    const [errMsg, setErrMsg] = useState();

    useEffect(() => {
        InitializeAppData();
    }, []);

    useEffect(() => {
        const user = friends.find(user => user.id == isInvited);
        setGameInvitation(user);
    }, [isInvited])

    const InitializeAppData = () => {
        GetChatsData();
        GetUserId();
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
                if (!gameObject) {
                    setErrMsg('Invitation probably cancelled by inviter');
                } else{
                    dispatch(CreateGame(gameObject));
                    console.log('joining game');
                    history.push('/game');
                }
            })
            newSocket.on('messageRecieved', async message => {
                dispatch(AddMessageToState(message));
            });
            newSocket.on('friendAdded', friend => {
                dispatch(AddFriendToList(friend));
            });
            newSocket.on('friendConnected', userId => {
                console.log('user ' + userId + ' connected')
                dispatch(ChangeIsConnected(userId, true));
            });
            newSocket.on('friendDisconnected', userId => {
                console.log('user ' + userId + ' disconnected')
                dispatch(ChangeIsConnected(userId, false));
            })
            newSocket.on('invited', userId => {
                setIsInvited(userId);
            })
        }
    }
    
    const GetUserId = () => {
        axios.get(configurations.server + 'getUserId', {withCredentials:true}).then(result => {
            dispatch(SaveUserId(result.data));
        })
    }

    const GetChatsData = () => {
        axios.get(configurations.server + 'getUserChats', {withCredentials: true}).then(result =>{
            console.log(result.data);
            result.data.forEach(chat => {
                chat.messages.forEach(message => {
                    dispatch(AddMessageToState(message));
                })
            })
        }).catch(err => console.log(err));
    }
    

    const requestRandomGame = () => {
        socket.emit('requestRandomGame');
    }

    const closeSnackberHandler = (event, reason) => {
        setIsInvited(undefined);
    }

    const closeErrSnackberHandler = () => {
        setErrMsg(undefined);
    }

    const joinInivitedGame = () => {
        socket.emit('acceptInvitation', gameInvitation.id);
    }

    return (
    <div className="menu-container">
            <Snackbar open={gameInvitation} autoHideDuration={6000} onClose={closeSnackberHandler}>
                <Alert variant="filled" onClick={joinInivitedGame}>{gameInvitation?.username} inivited you to a game, click here to join</Alert>
            </Snackbar>
            <Snackbar open={errMsg} autoHideDuration={6000} onClose={closeErrSnackberHandler}>
                <Alert variant="filled" color="error">{errMsg}</Alert>
            </Snackbar>
        <Drawer width="200px" open={isDrawOpen} onBackdropClick={() => setIsDrawOpen(false)}>
                <Friends ></Friends>
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
                    <Button color="primary" variant="contained" fullWidth="true" onClick={requestRandomGame}>
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