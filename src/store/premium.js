import { createSlice } from "@reduxjs/toolkit";

const initialState = { activatedPremium : localStorage.getItem('activatedPremium') || false }

const premiumSlice = createSlice({
    name : 'premium',
    initialState,
    reducers : {
        activatePremium(state, action){
            state.activatedPremium = action.payload
        }
    }
})

export const premiumActions =premiumSlice.actions;
export default premiumSlice.reducer;