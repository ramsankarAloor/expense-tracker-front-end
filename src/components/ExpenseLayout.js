import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import classes from "./ExpenseLayout.module.css";
import { useState } from "react";
import axios from "axios";

const editUrlBase = `https://expense-tracker-front-en-3cc1e-default-rtdb.firebaseio.com/expenses/`;

const ExpenseLayout = () => {
  const [expenses, setExpenses] = useState({});
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("food");
  const [keyId, setKeyId] = useState("");

  const [editing, setEditing] = useState(false);

  function populateForEdit(obj, k) {
    setEditing(true);
    setKeyId(k);
    setAmount(obj.amount);
    setDesc(obj.description);
    setCat(obj.category);
  }

  async function editExpense() {
    const obj = { amount: +amount, description: desc, category: cat };
    try {
      await axios.put(`${editUrlBase}/${keyId}.json`, obj);

      setExpenses((prevExpenses) => {
        return { ...prevExpenses, [keyId]: obj };
      });

      setAmount("");
      setDesc("");
      setCat("food");
      setEditing(false);
    } catch (error) {
      console.error("Error: ", error.message);
    }
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
          editing={editing}
          setEditing={setEditing}
          editExpense={editExpense}
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
