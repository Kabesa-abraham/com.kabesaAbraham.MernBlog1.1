//ceci est le magasin qui va contenir tout les données
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice'

export const store = configureStore({
    reducer:{
        user: userReducer, 
    }
})