import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "./AuthPage.module.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
import { authActions } from "../store/auth";

const signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FB_KEY}`;
const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FB_KEY}`;

const AuthPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const emailRef = useRef();
  const passRef = useRef();
  const conPassRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  function switchAuth() {
    setIsLogin((prevState) => !prevState);
  }

  function forgotPasswordHandler(){
    history.push("/forgot-password")
  }

  async function sendAuthApi() {
    const enteredEmail = emailRef.current.value;
    const enteredPass = passRef.current.value;

    if (!isLogin) {
      //signup
      const enteredConfPass = conPassRef.current.value;

      if (enteredPass !== enteredConfPass) {
        alert("Enter the same password for confirmation");
        passRef.current.value = "";
        conPassRef.current.value = "";
        return;
      }

      const reqBody = {
        email: enteredEmail,
        password: enteredPass,
        requireSecureToken: true,
      };

      try {
        await axios.post(signupUrl, reqBody);
        setIsLogin(true)
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage = error.response.data.error.message;
          alert(errorMessage);
        } else {
          console.log(error.message);
        }
      }

      conPassRef.current.value = "";
    } else {
      //login
      const reqBody = {
        email: enteredEmail,
        password: enteredPass,
        requireSecureToken: true,
      };

      try {
        const { data } = await axios.post(loginUrl, reqBody);
        console.log(data);
        dispatch(authActions.login({token : data.idToken, uid : data.localId}));
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('uid', data.localId);
        history.replace("/home");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage = error.response.data.error.message;
          alert(errorMessage);
        } else {
          console.log(error.message);
        }
      }
    }

    emailRef.current.value = "";
    passRef.current.value = "";
  }

  return (
    <div className={styles["for-container"]}>
      <Card className={styles["for-card"]}>
        {isLogin ? <h3>Login</h3> : <h3>Signup</h3>}
        <div className="form-floating">
          <input
            className="form-control"
            type="email"
            required
            placeholder="email"
            id="email"
            ref={emailRef}
          ></input>
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            type="password"
            required
            placeholder="password"
            id="password"
            ref={passRef}
          ></input>
          <label htmlFor="password">Password</label>
        </div>
        {!isLogin && (
          <div className="form-floating">
            <input
              className="form-control"
              type="password"
              required
              placeholder="password"
              id="confirm-password"
              ref={conPassRef}
            ></input>
            <label htmlFor="confirm-password">Confirm password</label>
          </div>
        )}
        <button className={styles["blue-link"]} onClick={forgotPasswordHandler}>Forgot password?</button>
        <Button className={styles["s-button"]} onClick={sendAuthApi}>
          {isLogin ? "Login" : "Signup"}
        </Button>
        <button className={styles.switch} onClick={switchAuth}>
          {isLogin
            ? "Don't have an account? Signup"
            : "Have an account ? Login"}
        </button>
      </Card>
    </div>
  );
};

export default AuthPage;
