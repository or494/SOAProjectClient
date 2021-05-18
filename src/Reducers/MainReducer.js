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