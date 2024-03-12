import { useContext } from "react";
import { Container } from "react-bootstrap";
import ExpenseContext from "../store/expense-context";
import classes from './ExpenseTable.module.css'

const ExpenseTable = () => {
  const expCtx = useContext(ExpenseContext);

  const expenseList = expCtx.expenses.map((exp, index) => {
    return (
      <tr key={index}>
        <td>{exp.amount}</td>
        <td>{exp.description}</td>
        <td>{exp.category}</td>
      </tr>
    );
  });
  return (
    <Container className={classes['for-container']}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Amount</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {expenseList}
        </tbody>
      </table>
    </Container>
  );
};

export default ExpenseTable;
