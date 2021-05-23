import './Chat.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import { AddMessageToState } from './Actions/action';
import Message from './Message';

function Chat(props) {
    const dispatch = useDispatch();
    const socket = useSelector(state => state.socketIO);
    const messages = useSelector(state => state.messageList);
    const userId = useSelector(state => state.userId);
    const [chatMessages, setChatMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        loadMessages();
    }, [messages])

    const loadMessages = async() =>{
        const tmpMessages = [];
        messages.forEach(message => {
            if(message.sender == props.user.id || message.reciever == props.user.id) tmpMessages.push(message);
        });
        setChatMessages(tmpMessages);
        console.log(tmpMessages);
    }

    const sendMessage = () => {
        if(input != ''){
            socket.emit('messageSend', {target: props.user.id, content: input});
            dispatch(AddMessageToState({sender: userId, reciever: props.user.id, content: input, sendTime: (new Date()).toString()}));
            setInput('');
        }
    }

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    return (
        <div className="chat-container">
            <div className="chat-main-grid">
                <div className="chat-messages-view">
                    {chatMessages.map(message => {
                        return <Message message={message}></Message> 
                    })}
                </div>
                <div className="chat-input-view">
                    message<input type="text" value={input} onChange={handleInputChange}></input>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;