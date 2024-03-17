import { Card, Container, Button } from "react-bootstrap";
import classes from "./ExpenseForm.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expensesAction } from "../store/expenses";

const expensesUrl = `https://expense-tracker-front-en-3cc1e-default-rtdb.firebaseio.com/expenses.json`;

const ExpenseForm = (props) => {
  const dispatch = useDispatch()
  // const expenses = useSelector(state => state.expenses.expenses)
  const amount = props.amount;
  const setAmount = props.setAmount;
  const desc = props.desc;
  const setDesc = props.setDesc;
  const cat = props.cat;
  const setCat = props.setCat;

  async function onAddExpense() {
    if (!amount) {
      return;
    }
    const obj = { amount: +amount, description: desc, category: cat };
    try {
      const { data } = await axios.post(expensesUrl, obj);
      dispatch(expensesAction.addExpense({expenseId : data.name, obj : obj}))

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
      <Card className={classes["for-card"]}>
        <h3>Add Expense</h3>
        <div className="mb-3 input-group">
          <span className="input-group-text">&#8377;</span>
          <div className="form-floating">
            <input
              className="form-control"
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
            className="form-control"
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
            className="form-select"
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
              variant="outline-secondary"
              className={`${classes["cancel-button"]} ${classes["s-button"]}`}
              onClick={onCancelEdit}
            >
              Cancel Edit
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
};

export default ExpenseForm;
