import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import classes from "./ExpenseLayout.module.css";
import { useState } from "react";

const ExpenseLayout = () => {
  const [expenses, setExpenses] = useState({});

  return (
      <div className={classes["for-container"]}>
        <div className={classes.half}>
          <ExpenseForm expenses={expenses} setExpenses={setExpenses}/>
        </div>
        <div className={classes.half}>
          <ExpenseTable expenses={expenses} setExpenses={setExpenses}/>
        </div>
      </div>
  );
};

export default ExpenseLayout;
