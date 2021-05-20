import './Chat.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import configurations from './configurations';

function Chat(props) {
    const chats = useSelector(state => state.chatsList);
    const [chat, setChat] = useState();

    useEffect(() => {
        loadChat();
    }, [])

    const loadChat = async() =>{
        chats.forEach(chatData => {
            if(props.user == chatData.userId) setChat(chatData);
        });
    
        if(!chat) setChat(await GetChatData());

        console.log(chat);
    }

    const GetChatData = () => {
        return new Promise((resolve) => {
            axios.get(configurations.server + 'getChatData/' + props.user, {withCredentials: true}).then(result =>{
                resolve(result.data);
            }).catch(err => console.log(err));
        })
    }

    return (
        <div className="chat-container">
            <div className="chat-main-grid">
                <div className="chat-messages-view">

                </div>
                <div className="chat-input-view">

                </div>
            </div>
        </div>
    );
}

export default Chat;