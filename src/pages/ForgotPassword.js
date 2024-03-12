import { Card, Button } from "react-bootstrap";
import classes from "./AuthPage.module.css";
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const passwordResetUrl = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FB_KEY}`;

const ForgotPassword = () => {
  const emailRef = useRef();
  const history = useHistory();
  
  async function sendLinkHandler() {
    const emailEntered = emailRef.current.value;
    const reqObj = { requestType: "PASSWORD_RESET", email: emailEntered };

    try {
      await axios.post(passwordResetUrl, reqObj);
      emailRef.current.value = "";
      history.push("/auth");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className={classes["for-container"]}>
      <Card className={classes["for-card"]}>
        <h3>Forgot Password</h3>
        <div className="form-floating">
          <input
            className="form-control"
            type="email"
            required
            placeholder="email"
            id="email"
            ref={emailRef}
          ></input>
          <label htmlFor="email">Enter registered email</label>
        </div>
        <Button className={classes["s-button"]} onClick={sendLinkHandler}>
          Send link
        </Button>
      </Card>
    </div>
  );
};

export default ForgotPassword;
