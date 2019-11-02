import { combineReducers, createStore, applyMiddleware} from 'redux';
import { UsersReducers } from './reducers/UsersReducer';
import thunk from 'redux-thunk';

const Reducers = combineReducers({
    users: UsersReducers,
});

export const Store = createStore(Reducers, applyMiddleware(thunk));