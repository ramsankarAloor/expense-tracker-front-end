import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import classes from "./ExpenseLayout.module.css";
import { useState} from "react";

const ExpenseLayout = () => {
  const [expenses, setExpenses] = useState({});
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("food");

  function populateForEdit(obj){
    setAmount(obj.amount)
    setDesc(obj.description)
    setCat(obj.category)
  }
  return (
    <div className={classes["for-container"]}>
      <div className={classes.half}>
        <ExpenseForm
          expenses={expenses}
          setExpenses={setExpenses}
          amount={amount}
          desc={desc}
          cat={cat}
          setAmount={setAmount}
          setCat={setCat}
          setDesc={setDesc}
        />
      </div>
      <div className={classes.half}>
        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          populateForEdit={populateForEdit}
        />
      </div>
    </div>
  );
};

export default ExpenseLayout;
