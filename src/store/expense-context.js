import React, { useState } from "react";

const ExpenseContext = React.createContext({
  expenses : [],
  addExpense: ()=>{}
});

export const ExpenseProvider = (props) => {
    const [expenses, setExpenses] = useState([])

    const expenseContext = {
        expenses : expenses,
        addExpense
    }

    function addExpense(exp){
        setExpenses((prevExp)=> [...prevExp, exp])
    }

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
