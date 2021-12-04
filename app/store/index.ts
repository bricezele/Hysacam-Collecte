/**
 * Project HysacamCollecte
 * File index
 * Path app/store
 * Created by BRICE ZELE
 * Date: 04/12/2021
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import logger from 'redux-logger';
import {applyMiddleware, createStore} from 'redux';
import {RootReducer} from '../redux';
import ApiMiddleware from '../middleware/ApiMiddleware';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const middleware = [thunk, ApiMiddleware];
if (__DEV__) {
    // @ts-ignore
    middleware.push(logger);
}
const persistedReducer = persistReducer(persistConfig, RootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
// @ts-ignore
const persistor = persistStore(store);

export {store, persistor};
