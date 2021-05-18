import {combineReducers} from 'redux'
import {SocketReducer, GameReducer, BoardReducer} from './MainReducer'

const allReducers = combineReducers({socketIO: SocketReducer, gameObject: GameReducer, gameBoard: BoardReducer});

export default allReducers;
