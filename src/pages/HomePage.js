import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import classes from "./HomePage.module.css";
import { useState } from "react";
import { Card, FormControl, Button } from "react-bootstrap";

const HomePage = () => {
  const [updateOpen, setUpdateOpen] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Welcome to Expense tracker!!</Navbar.Brand>
          <span className={classes.flex}>
            Your profile is incomplete.
            <button
              className={classes["blue-link"]}
              onClick={() => setUpdateOpen(true)}
            >
              {" "}
              Complete now
            </button>
          </span>
        </Container>
      </Navbar>
      {updateOpen && (
        <Container>
          <Card className={classes["for-card"]}>
            <div className={classes["custom-input-wrapper"]}>
              <div className="form-floating">
                <FormControl placeholder="name"></FormControl>
                <label htmlFor="name">Full Name</label>
              </div>
            </div>
            <div className={classes["custom-input-wrapper"]}>
              <div className="form-floating">
                <FormControl placeholder="name"></FormControl>
                <label htmlFor="name">Profile Photo URL</label>
              </div>
            </div>
            <div className={classes["custom-input-wrapper"]}></div>
            <div className={classes["custom-button-wrapper"]}>
              <Button variant="outline-secondary" className={classes.button}>
                Cancel
              </Button>
              <Button variant="primary" className={classes.button}>
                Update
              </Button>
            </div>
          </Card>
        </Container>
      )}
    </>
  );
};

export default HomePage;
