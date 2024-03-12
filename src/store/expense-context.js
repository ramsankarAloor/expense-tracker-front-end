import React, { useEffect, useState } from "react";
import axios from "axios";

const expensesUrl = `https://expense-tracker-front-en-3cc1e-default-rtdb.firebaseio.com/expenses.json`;

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: () => {},
});

export const ExpenseProvider = (props) => {
  const [expenses, setExpenses] = useState({});

  useEffect(() => {getExpenses()}, []);

  async function getExpenses() {
    try {
      const {data} = await axios.get(expensesUrl);
      setExpenses(data);
    } catch (error) {
      console.error("Error in get expenses : ", error.message);
    }
  }

  const expenseContext = {
    expenses: expenses,
    addExpense,
  };

  function addExpense(exp) {
    setExpenses((prevExp) => [...prevExp, exp]);
  }

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
