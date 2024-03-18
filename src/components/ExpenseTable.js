import { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
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
  const darkTheme = useSelector((state) => state.theme.darkTheme);

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

  const handleDownload = () => {
    let csv = [];
    const columns = Array.from(document.querySelectorAll("table thead th")).map(
      (th) => th.innerText
    ).slice(0,3);
    csv.push(columns.join(","));
    const rows = document.querySelectorAll("table tbody tr");
    rows.forEach((row) => {
      const rowData = [];
      row.querySelectorAll("td").forEach((cell) => {
        if (cell.innerText === "Delete" || cell.innerText === "Edit") {
        } else {
          rowData.push(cell.innerText);
        }
      });
      if (rowData.length !== 0) {
        csv.push(rowData.join(","));
      }
    });
    const csvString = csv.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className={classes["for-container"]}>
      <Table variant={darkTheme && "dark"}>
        <thead>
          <tr>
            <th scope="col" className={classes["for-dark"]}>
              Description
            </th>
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
      </Table>
      <Button
        variant={darkTheme ? "outline-light" : "outline-dark"}
        onClick={handleDownload}
      >
        Download CSV
      </Button>
    </Container>
  );
};

export default ExpenseTable;
