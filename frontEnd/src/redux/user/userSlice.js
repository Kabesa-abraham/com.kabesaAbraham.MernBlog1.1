import { createSlice } from "@reduxjs/toolkit";

//ici on aura toutes la logiques

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state) =>{
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false,
            state.error = null;
        },
        signInFaillure: (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },

        updateStart: (state) =>{
            state.loading = true,
            state.error= null
        },
        updateSuccess: (state,action) =>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        updateFaillure : (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },

        deleteUserStart: (state) =>{
            state.loading = true,
            state.error= null
        },
        deleteUserSuccess: (state) =>{
            state.currentUser = null, //je met ça à null pour ne plus avoir des infos sur le user
            state.loading = false,
            state.error = null
        },
        deleteUserFaillure : (state,action) =>{
            state.loading = false,
            state.error = action.payload
        },

        signOutSuccess : (state) =>{
            state.currentUser = null
            state.loading= false,
            state.error = null
        }

    }
})

export const {signInStart, signInSuccess, signInFaillure,
              updateStart , updateSuccess, updateFaillure,
              deleteUserStart , deleteUserFaillure , deleteUserSuccess,
              signOutSuccess
             } = userSlice.actions;
export default userSlice.reducer