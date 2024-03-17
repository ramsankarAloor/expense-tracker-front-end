import { createSlice } from "@reduxjs/toolkit";

const initialState = { expenses : {}, totalAmount : 0}

const expensesSlice = createSlice({
    name : 'expenses',
    initialState,
    reducers : {
        addExpense(state, action){
            state.expenses = {...state.expenses, [action.payload.expenseId] : action.payload.obj}
            state.totalAmount += action.payload.obj.amount
        },
        getExpenses(state, action) {
            state.expenses = action.payload.expenses;
            state.totalAmount = Object.values(action.payload.expenses).reduce((acc, currentValue)=> acc+currentValue.amount, 0)
        },
        clearExpenses(state){
            state.expenses = {};
            state.totalAmount = 0;
        }
    }
})

export const expensesAction =expensesSlice.actions;
export default expensesSlice.reducer;