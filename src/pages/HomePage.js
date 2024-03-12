import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import classes from "./HomePage.module.css";
import { useState, useContext, useEffect } from "react";
import { Card, FormControl, Button } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import axios from "axios";
import { useHistory } from "react-router-dom";

const updateProfileUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FB_KEY}`;
const userDataUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FB_KEY}`;
const verifyEmailUrl = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FB_KEY}`;

const HomePage = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [fullname, setFullname] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const { data } = await axios.post(userDataUrl, { idToken: authCtx.token });
    if (data.users[0].emailVerified) {
      authCtx.afterVerification();
    }
    if (data.users[0].displayName) {
      authCtx.onUpdateUser(true);
      setFullname(data.users[0].displayName);
      setPhotoUrl(data.users[0].photoUrl);
    }
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

  async function onVerifyEmail() {
    const reqObj = { requestType: "VERIFY_EMAIL", idToken: authCtx.token };
    const response = await axios.post(verifyEmailUrl, reqObj);
    console.log(response);
  }

  function logoutHandler(){
    authCtx.onLogout()
    history.replace("/auth")
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Expense tracker</Navbar.Brand>
          {!authCtx.verifiedUser && (
            <span>
              <button className={classes["blue-link"]} onClick={onVerifyEmail}>
                Verify Email !!
              </button>
            </span>
          )}

          {!authCtx.updatedUser && (
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

          {authCtx.updatedUser && (
            <Button
              variant="outline-secondary"
              className={classes.button}
              onClick={() => setUpdateOpen(true)}
            >
              Edit profile
            </Button>
          )}

          <Button
            variant="outline-secondary"
            className={classes.button}
            onClick={logoutHandler}
          >
            Logout
          </Button>

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
