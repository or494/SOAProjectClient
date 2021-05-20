import './Friends.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import configurations from '../src/configurations';
import {AddFriendToList} from './Actions/action';
import FriendView from './FriendView';

function Friends(props) {
    const socket = useSelector(state => state.socketIO);
    const friends = useSelector(state => state.friendsList);
    const dispatch = useDispatch();

    useEffect(() => {
        if(friends.length == 0) GetFriends();
    }, [])

    const GetFriends = () => {
        axios.get(configurations.server + 'getFriends', {withCredentials: true}).then(result => {
            result.data.forEach(friend => {
                dispatch(AddFriendToList(friend));
            });
            console.log(friends);
        }).catch(err => console.log(err));
    }

    return (
        <div className="friends-container">
            {friends.map(friend => {
                return <FriendView user={friend}></FriendView>
            })}
        </div>
    );
}

export default Friends;