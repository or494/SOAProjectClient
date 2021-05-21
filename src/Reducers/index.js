import {combineReducers} from 'redux'
import {SocketReducer, GameReducer, BoardReducer, FriendsReducer, MessageReducer} from './MainReducer'

const allReducers = combineReducers({socketIO: SocketReducer,
                                     gameObject: GameReducer,
                                     gameBoard: BoardReducer,
                                     friendsList: FriendsReducer,
                                     messageList: MessageReducer});

export default allReducers;
