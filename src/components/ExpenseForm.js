import { Card, Container, Button } from "react-bootstrap";
import classes from "./ExpenseForm.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "../store/expenses";
import BASE_URL from "../config";

const ExpenseForm = (props) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const amount = props.amount;
  const setAmount = props.setAmount;
  const desc = props.desc;
  const setDesc = props.setDesc;
  const cat = props.cat;
  const setCat = props.setCat;

  const expensesUrl = `${BASE_URL}/${uid}/expenses.json`;

  async function onAddExpense() {
    if (!amount) {
      return;
    }
    const obj = { amount: +amount, description: desc, category: cat };
    try {
      const { data } = await axios.post(expensesUrl, obj);
      dispatch(expensesActions.addExpense({ expenseId: data.name, obj: obj }));
      setAmount("");
      setDesc("");
      setCat("food");
    } catch (error) {
      console.error("Error : ", error.message);
    }
  }

  function onCancelEdit() {
    props.setEditing(false);
    setAmount("");
    setDesc("");
    setCat("food");
  }

  return (
    <Container className={classes["for-container"]}>
      <div
        className={`${classes["for-card"]} ${
          darkTheme ? "card text-bg-dark border-light" : "card"
        }`}
      >
        <h3>Add Expense</h3>
        <div className="mb-3 input-group">
          <span className="input-group-text">&#8377;</span>
          <div className="form-floating">
            <input
              className={darkTheme ? "form-control bg-dark" : "form-control"}
              type="number"
              min="0"
              step="0.01"
              required
              placeholder="amount"
              id="amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            ></input>
            <label htmlFor="amount">Amount</label>
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            className={darkTheme ? "form-control bg-dark" : "form-control"}
            type="text"
            placeholder="desc"
            id="desc"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></input>
          <label htmlFor="desc">Description</label>
        </div>
        <div className="form-floating mb-3">
          <select
            className={
              darkTheme ? "form-select bg-dark text-bg-dark" : "form-select"
            }
            id="category"
            onChange={(e) => setCat(e.target.value)}
            value={cat}
          >
            <option value="food">Food</option>
            <option value="fuel">Fuel</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor="category">Category</label>
        </div>
        {!props.editing ? (
          <Button className={classes["s-button"]} onClick={onAddExpense}>
            Add Expense
          </Button>
        ) : (
          <>
            <Button className={classes["s-button"]} onClick={props.editExpense}>
              Edit Expense
            </Button>
            <Button
              variant={darkTheme ? "outline-light" : "outline-secondary"}
              className={`${classes["cancel-button"]} ${classes["s-button"]}`}
              onClick={onCancelEdit}
            >
              Cancel Edit
            </Button>
          </>
        )}
      </div>
    </Container>
  );
};

export default ExpenseForm;
