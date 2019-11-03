import { combineReducers, createStore, applyMiddleware} from 'redux';
import { UsersReducers } from './reducers/UsersReducer';
import { ParkingsReducer } from './reducers/ParkingsReducer';
import thunk from 'redux-thunk';

const Reducers = combineReducers({
    users: UsersReducers,
    parkings: ParkingsReducer
});

export const Store = createStore(Reducers, applyMiddleware(thunk));