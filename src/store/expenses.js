import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenses : {}, totalAmount : 0}

const expensesSlice = createSlice({
    name : 'expenses',
    initialState,
    reducers : {
        addExpense(state, action){
            state.expenses = {...state.expenses, [action.payload.expenseId] : action.payload.obj}
        },
        getExpenses(state, action) {
            state.expenses = action.payload.expenses;
        },
        updateExpense(state, action){
            state.expenses = {...state.expenses, [action.payload.expenseId] : action.payload.obj}
        }
    }
})

export const expensesAction =expensesSlice.actions;
export default expensesSlice.reducer;