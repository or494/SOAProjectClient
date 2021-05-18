import {combineReducers} from 'redux'
import {SocketReducer, GameReducer} from './MainReducer'

const allReducers = combineReducers({socketIO: SocketReducer, gameObject: GameReducer});

export default allReducers;
