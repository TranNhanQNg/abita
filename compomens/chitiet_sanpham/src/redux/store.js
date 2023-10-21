import { createStore, applyMiddleware } from 'redux';
import rootDucer from './rootDucer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['cart.dataCart' ]
};

const persistedReducer = persistReducer(persistConfig, rootDucer);
const store = createStore(
    persistedReducer, 
    applyMiddleware() 
);
const  persistor = persistStore(store);


export {store, persistor};