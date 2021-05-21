export function SocketReducer (state = null, action) {
    if(action.type === 'create_socket'){ 
        state = action.payload.socket;
    }
    else if(action.type === 'remove_socket'){
        state = null
    }
    return state;
}

export function GameReducer(state = null, action){
    if(action.type === 'create_game'){
        state = action.payload.game;
    } 
    else if(action.type === 'remove_game'){
        state = null;
    }
    return state;
}

export function BoardReducer(state = [], action){
    if(action.type === 'add_board_column'){
        return [...state, action.payload.column];
    } 
    else if(action.type === 'remove_board'){
        state = [];
    }
    return state;
}

export function FriendsReducer(state = [], action){
    if(action.type === 'add_friend_to_list'){
        return [...state, action.payload.friend];
    }
    return state;
}

export function MessageReducer(state = [], action){
    if(action.type == 'add_message_to_chat'){
        return [...state, action.payload.message];
    }
    return state;
}