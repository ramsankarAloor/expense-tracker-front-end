import AuthPage from "./pages/AuthPage";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to='/auth'></Redirect>
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
