import AuthPage from "./pages/AuthPage";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const authCtx = useContext(AuthContext)
  return (
    <>
      <Switch>
        <Route path="/" exact>
          {authCtx.isLoggedIn ? <Redirect to='/home'></Redirect> : <Redirect to='/auth'></Redirect>}
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/home">
          {authCtx.isLoggedIn ? <HomePage /> : <Redirect to='/auth'></Redirect>}
        </Route>
      </Switch>
    </>
  );
}

export default App;
