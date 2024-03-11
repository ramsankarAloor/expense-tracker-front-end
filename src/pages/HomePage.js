import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import classes from "./HomePage.module.css";
import { useState, useRef, useContext } from "react";
import { Card, FormControl, Button } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import axios from 'axios';

const updateProfileUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FB_KEY}`


const HomePage = () => {
    const authCtx = useContext(AuthContext)
  const [updateOpen, setUpdateOpen] = useState(false);
  const fullnameRef = useRef()
  const photoRef = useRef()

  async function sendUpdateApi(){
    const fullname = fullnameRef.current.value
    const photoUrl = photoRef.current.value

    const obj = {idToken: authCtx.token, displayName: fullname, photoUrl, returnSecureToken: true}

    const response = await axios.post(updateProfileUrl, obj);
    console.log(response)

    fullnameRef.current.value = ''
    photoRef.current.value = ''
  }

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
                <FormControl placeholder="name" ref={fullnameRef}></FormControl>
                <label htmlFor="name">Full Name</label>
              </div>
            </div>
            <div className={classes["custom-input-wrapper"]}>
              <div className="form-floating">
                <FormControl placeholder="photo" ref={photoRef}></FormControl>
                <label htmlFor="name">Profile Photo URL</label>
              </div>
            </div>
            <div className={classes["custom-input-wrapper"]}></div>
            <div className={classes["custom-button-wrapper"]}>
              <Button variant="outline-secondary" className={classes.button} onClick={()=>setUpdateOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" className={classes.button} onClick={sendUpdateApi}>
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
