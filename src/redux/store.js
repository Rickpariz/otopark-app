import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { UsersReducers } from './reducers/UsersReducer';
import { ParkingsReducer } from './reducers/ParkingsReducer';
import { SystemReducer } from './reducers/SystemReducer';
import { CustomersReducer } from './reducers/CustomersReducer';
import { VehiclesReducer } from './reducers/VehiclesReducer';
import { LotsReducer } from './reducers/LotsReducer';
import { TablePricesReducer } from './reducers/TablePriceReducer';


const Reducers = combineReducers({
    users: UsersReducers,
    parkings: ParkingsReducer,
    system: SystemReducer,
    customers: CustomersReducer,
    vehicles: VehiclesReducer,
    lots: LotsReducer,
    tablePrices: TablePricesReducer
});

const persistConfig = {
    key: 'root',
    timeout: 0,
    storage,
    whitelist: ['system'],
    version: 1
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, Reducers);
const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(thunk)))
const persistor = persistStore(store)

export { store, persistor }