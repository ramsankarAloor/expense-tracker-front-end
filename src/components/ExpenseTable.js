import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import classes from "./ExpenseTable.module.css";
import axios from "axios";

const expensesUrl = `https://expense-tracker-front-en-3cc1e-default-rtdb.firebaseio.com/expenses.json`;
const deleteBaseUrl = `https://expense-tracker-front-en-3cc1e-default-rtdb.firebaseio.com/expenses/`;

const ExpenseTable = (props) => {

  useEffect(() => {
    getExpenses();
  }, []);

  async function getExpenses() {
    try {
      const { data } = await axios.get(expensesUrl);
      props.setExpenses(data);
    } catch (error) {
      console.error("error in get expenses ", error.message);
    }
  }

  const expenseList = Object.keys(props.expenses).map((key, index) => {
    async function deleteExpenseHandler() {
      const copyExp = { ...props.expenses };
      try {
        await axios.delete(`${deleteBaseUrl}/${key}.json`);
      } catch (error) {
        console.error("Error in delete expense : ", error.message);
      }
      delete copyExp[key];
      props.setExpenses(copyExp);
    }

    async function editExpenseHandler(){
      props.populateForEdit(props.expenses[key])
    }
    return (
      <tr key={index}>
        <td>{props.expenses[key].amount}</td>
        <td>{props.expenses[key].description}</td>
        <td>{props.expenses[key].category}</td>
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
            <th scope="col">Amount</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{expenseList}</tbody>
      </table>
    </Container>
  );
};

export default ExpenseTable;
