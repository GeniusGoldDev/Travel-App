import { createStore, applyMiddleware } from "redux";
import Logger from "redux-logger";
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import Thunk from "redux-thunk";
import reducers from "./reducers";




/*
 middlewares for redux
    - Thunk for Async requests
    - Logger for logging actions and reducers result
 */
const middleware = [Thunk, Logger];


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist : ["loading"]
}
const persistedReducer = persistReducer(persistConfig, reducers)


if (process.env.NODE_ENV !== 'production') {
  middleware.push(Logger);
}
let store = createStore(persistedReducer,applyMiddleware(...middleware))
let persistor = persistStore(store)

export {store,persistor}
