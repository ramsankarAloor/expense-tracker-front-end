import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import classes from "./ExpenseLayout.module.css";
import { ExpenseProvider } from "../store/expense-context";

const ExpenseLayout = () => {
  return (
    <ExpenseProvider>
      <div className={classes["for-container"]}>
        <div className={classes.half}>
          <ExpenseForm />
        </div>
        <div className={classes.half}>
          <ExpenseTable />
        </div>
      </div>
    </ExpenseProvider>
  );
};

export default ExpenseLayout;
