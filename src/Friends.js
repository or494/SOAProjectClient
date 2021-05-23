import './Friends.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import configurations from '../src/configurations';
import {AddFriendToList} from './Actions/action';
import FriendView from './FriendView';

function Friends(props) {
    const friends = useSelector(state => state.friendsList);
    const userId = useSelector(state => state.userId);
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState()
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('freind added');
        if(friends.length == 0)GetFriends();
    }, [friends]);


    const GetFriends = () => {
        axios.get(configurations.server + 'getFriends', {withCredentials: true}).then(result => {
            result.data.forEach(friend => {
                dispatch(AddFriendToList(friend));
            });
        }).catch(err => console.log(err));
    }

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
        if(event.target.value == '') setSearchResult(undefined);
        else{
            axios.get(configurations.server + 'searchUser/' + event.target.value, {withCredentials: true}).then(result => {
                setSearchResult(result.data);
            }).catch(err => console.log(err));
        }
    }

    return (
        <div className="friends-container">
            <div>
                <input value={searchInput} onChange={handleSearchInputChange}></input>
            </div>
            {searchResult == undefined ? (friends.map(friend => {
                return <FriendView isFriend={true} user={friend}></FriendView>
            })) : (searchResult.map(user => {
                if(user.id == userId) return null;
                else if(friends.find(friend => friend.id == user.id) != undefined) return <FriendView isFriend={true} user={user}></FriendView>
                else return <FriendView isFriend={false} user={user}></FriendView>
            }))}
        </div>
    );
}

export default Friends;