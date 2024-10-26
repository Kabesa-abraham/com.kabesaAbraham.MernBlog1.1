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
        }
    }
})

export const {signInStart,signInSuccess,signInFaillure,updateStart , updateSuccess,updateFaillure} = userSlice.actions;
export default userSlice.reducer