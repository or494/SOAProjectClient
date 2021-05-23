import './Message.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Message(props) {
    const friendList = useSelector(state => state.friendsList);
    const userId = useSelector(state => state.userId);
    const [sender, setSender] = useState();

    useEffect(() => {
        if(props.message.sender == userId) setSender('you');
        else{
            friendList.forEach(friend => {
                if(props.message.sender == friend.id) setSender(friend.username);
            });
        }
    }, [])

    return (
        <p>
            {sender}: {props.message.content}
            <div>
                time:{props.message.sendTime}
            </div>
        </p>
    );
}

export default Message;