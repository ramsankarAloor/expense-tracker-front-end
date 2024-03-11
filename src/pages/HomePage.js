import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import classes from "./HomePage.module.css";
import { useState, useContext, useEffect } from "react";
import { Card, FormControl, Button } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import axios from "axios";

const updateProfileUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FB_KEY}`;
const userDataUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FB_KEY}`;

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(true);
  const [fullname, setFullname] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const { data } = await axios.post(userDataUrl, { idToken: authCtx.token });
    if (data.users.length > 0) {
      setUpdatedUser(true);
    } else {
      setUpdatedUser(false);
    }
    setFullname(data.users[0].displayName);
    setPhotoUrl(data.users[0].photoUrl);
  }

  async function sendUpdateApi() {
    const obj = {
      idToken: authCtx.token,
      displayName: fullname,
      photoUrl,
      returnSecureToken: true,
    };

    const response = await axios.post(updateProfileUrl, obj);
    console.log(response);
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Welcome to Expense tracker!!</Navbar.Brand>
          {!updatedUser && (
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
          )}
          {updatedUser && (
            <Button
              variant="outline-secondary"
              className={classes.button}
              onClick={() => setUpdateOpen(true)}
            >
              Edit profile
            </Button>
          )}
        </Container>
      </Navbar>
      {updateOpen && (
        <Container className={classes["form-container"]}>
          <Card className={classes["for-card"]}>
            <div className="form-floating">
              <FormControl
                placeholder="name"
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
              ></FormControl>
              <label htmlFor="name">Full Name</label>
            </div>

            <div className="form-floating mt-3">
              <FormControl
                placeholder="photo"
                onChange={(e) => setPhotoUrl(e.target.value)}
                value={photoUrl}
              ></FormControl>
              <label htmlFor="name">Profile Photo URL</label>
            </div>

            <div className={classes["custom-button-wrapper"]}>
              <Button
                variant="outline-secondary"
                className={classes.button}
                onClick={() => setUpdateOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className={classes.button}
                onClick={sendUpdateApi}
              >
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
