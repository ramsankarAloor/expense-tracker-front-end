import { Card, Container, Button } from "react-bootstrap";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = () => {

    function onAddExpense(){}
    
  return (
    <Container className={classes["for-container"]}>
      <Card className={classes["for-card"]}>
        <h3>Add Expense</h3>
        <div className="mb-3 input-group">
          <span class="input-group-text">&#8377;</span>
          <div className="form-floating">
            <input
              className="form-control"
              type="number"
              min="0"
              step="0.01"
              required
              placeholder="amount"
              id="amount"
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
          ></input>
          <label htmlFor="desc">Description</label>
        </div>
        <div className="form-floating mb-3">
          <select className="form-select" id="category">
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
