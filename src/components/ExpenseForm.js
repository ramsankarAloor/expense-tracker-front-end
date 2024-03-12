import { Card, Container, Button } from "react-bootstrap";
import classes from "./ExpenseForm.module.css";
import { useRef } from "react";
import axios from "axios";

const expensesUrl = `https://expense-tracker-front-en-3cc1e-default-rtdb.firebaseio.com/expenses.json`;

const ExpenseForm = (props) => {
  const amountRef = useRef();
  const descRef = useRef();
  const catRef = useRef();

  async function onAddExpense() {
    const amount = amountRef.current.value;
    const description = descRef.current.value;
    const category = catRef.current.value;

    if (!amount) {
      return;
    }

    const obj = { amount, description, category };

    try {
      const { data } = await axios.post(expensesUrl, obj);
      props.setExpenses((prevExpenses)=> {
        return { ...prevExpenses, [data.name] : obj}
      })
    } catch (error) {
      console.error("Error : ", error.message);
    }

    amountRef.current.value = "";
    descRef.current.value = "";
    catRef.current.value = "food";
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
              ref={amountRef}
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
            ref={descRef}
          ></input>
          <label htmlFor="desc">Description</label>
        </div>
        <div className="form-floating mb-3">
          <select className="form-select" id="category" ref={catRef}>
            <option value="food">Food</option>
            <option value="fuel">Fuel</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor="category">Category</label>
        </div>
        <Button className={classes["s-button"]} onClick={onAddExpense}>
          Add Expense
        </Button>
      </Card>
    </Container>
  );
};

export default ExpenseForm;
