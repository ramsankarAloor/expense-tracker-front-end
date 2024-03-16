import { createSlice } from "@reduxjs/toolkit";

const initialState = {token: localStorage.getItem('token') || null, isLoggedIn: !!localStorage.getItem('token')}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action){
            state.isLoggedIn = true
            state.token = action.payload.token
        },
        logout(state){
            state.isLoggedIn = false
            state.token = ''
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;
