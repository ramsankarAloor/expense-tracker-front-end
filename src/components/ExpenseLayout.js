import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import classes from "./ExpenseLayout.module.css";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../store/expenses";
import BASE_URL from "../config";

const ExpenseLayout = () => {
  const uid = useSelector(state => state.auth.uid)
  const darkTheme = useSelector(state => state.theme.darkTheme);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("food");
  const [keyId, setKeyId] = useState("");

  const editUrlBase = `${BASE_URL}/${uid}/expenses/`;

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
      dispatch(expensesActions.updateExpense({ expenseId: keyId, obj: obj }));

      setAmount("");
      setDesc("");
      setCat("food");
      setEditing(false);
    } catch (error) {
      console.error("Error: ", error.message);
    }
  }

  return (
    <div className={`${classes["for-container"]} ${darkTheme ? classes['for-dark-container'] : ''}`}>
      <div className={classes.half}>
        <ExpenseForm
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
        <ExpenseTable populateForEdit={populateForEdit} />
      </div>
    </div>
  );
};

export default ExpenseLayout;
