import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import classes from "./ExpenseTable.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expensesAction } from "../store/expenses";
import BASE_URL from "../config";

const ExpenseTable = (props) => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const total = useSelector((state) => state.expenses.totalAmount);
  const uid = useSelector((state) => state.auth.uid);

  const expensesUrl = `${BASE_URL}/${uid}/expenses.json`;
  const deleteBaseUrl = `${BASE_URL}/${uid}/expenses/`;

  useEffect(() => {
    getExpenses();
  }, []);

  async function getExpenses() {
    try {
      const { data } = await axios.get(expensesUrl);
      dispatch(expensesAction.getExpenses({ expenses: data || {} }));
    } catch (error) {
      console.error("error in get expenses ", error.message);
    }
  }

  const expenseList = Object.keys(expenses).map((key, index) => {
    async function deleteExpenseHandler() {
      const copyExp = { ...expenses };
      try {
        await axios.delete(`${deleteBaseUrl}/${key}.json`);
      } catch (error) {
        console.error("Error in delete expense : ", error.message);
      }
      delete copyExp[key];
      dispatch(expensesAction.getExpenses({ expenses: copyExp }));
    }

    async function editExpenseHandler() {
      props.populateForEdit(expenses[key], key);
    }
    return (
      <tr key={index}>
        <td>{expenses[key].description}</td>
        <td>{expenses[key].category}</td>
        <td>{expenses[key].amount}</td>
        <td>
          <Button variant="outline-primary" onClick={editExpenseHandler}>
            Edit
          </Button>
        </td>
        <td>
          <Button variant="danger" onClick={deleteExpenseHandler}>
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <Container className={classes["for-container"]}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {expenseList}
          <tr>
            <th scope="col">Total</th>
            <th scope="col"></th>
            <th scope="col">{total}</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default ExpenseTable;
