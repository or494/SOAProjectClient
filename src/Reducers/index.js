import {combineReducers} from 'redux'
import {SocketReducer, GameReducer, BoardReducer, FriendsReducer, ChatsReducer} from './MainReducer'

const allReducers = combineReducers({socketIO: SocketReducer,
                                     gameObject: GameReducer,
                                     gameBoard: BoardReducer,
                                     friendsList: FriendsReducer,
                                     chatsList: ChatsReducer});

export default allReducers;
