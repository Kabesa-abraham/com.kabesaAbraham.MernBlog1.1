//ceci est le magasin qui va contenir tout les données
import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/userSlice'
import themeReducer from './theme/themeSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({ //cette methodes vous seras utiles lorsque vous aurez plusieurs reducers
    user: userReducer,
    theme: themeReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};
const persisteReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persisteReducer,
    middleware: (getDefaultMiddleware) => 
                 getDefaultMiddleware({serializableCheck: false}),
})

export const persistor = persistStore(store)  