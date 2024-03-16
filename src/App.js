import AuthPage from "./pages/AuthPage";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Redirect to='/home'></Redirect> : <Redirect to='/auth'></Redirect>}
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/home">
          {isLoggedIn ? <HomePage /> : <Redirect to='/auth'></Redirect>}
        </Route>
      </Switch>
    </>
  );
}

export default App;
