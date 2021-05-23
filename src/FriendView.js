import './FriendView.css';
import React, { useState } from 'react';
import { Button, Dialog, Modal , DialogContent} from '@material-ui/core';
import { useHistory } from 'react-router';
import Slide from '@material-ui/core/Slide';
import Chat from './Chat';
import { useSelector } from 'react-redux';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

function FriendView(props) {
    const socket = useSelector(state => state.socketIO);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const history = useHistory();

    const AddUserToFriends = () => {
        socket.emit('AddToFriends', props.user.id);
    }

    return (
        <div className="friend-view-container">
            <div className="friend-view-grid">
                <div className={(props.user.isConnected ? 'green' : 'red') + " friend-view-image-container"}></div>
                <div className="friend-view-name">{props.user.username}</div>
                { props.isFriend?
                    (<div className="friend-view-btns-container">
                        <Button fullWidth="true" user={props.user} onClick={() => setIsChatModalOpen(true)}>
                            Chat
                        </Button>
                        <Button fullWidth="true">
                            Invite to game
                        </Button>
                    </div>) : 
                    (<div>
                        <Button fullWidth="true" user={props.user} onClick={AddUserToFriends}>
                            Add to friends
                        </Button>
                    </div>) 
                }
            </div>
            <Dialog TransitionComponent={Transition} open={isChatModalOpen} onBackdropClick={() => setIsChatModalOpen(false)}>
                <DialogContent>
                    <Chat user={props.user}></Chat>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default FriendView;