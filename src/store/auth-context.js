import React, { useState } from "react";

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  updatedUser: false,
  verifiedUser: false,
  onLogin: (token) => {},
  onLogout: () => {},
  onUpdateUser: () => {},
  makeVerification: ()=>{}
});

export const AuthProvider = (props) => {
  const t = localStorage.getItem("token");
  const [token, setToken] = useState(t);
  const [updatedUser, setUpdatedUser] = useState();
  const [verifiedUser, setVerifiedUser] = useState();

  function onUpdateUser(t) {
    setUpdatedUser(t);
  }

  function onLogin(t) {
    setToken(t);
    localStorage.setItem("token", t);
  }

  function onLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  function makeVerification(t){
    setVerifiedUser(t)
  }

  const authContext = {
    token,
    isLoggedIn: !!token,
    updatedUser,
    verifiedUser,
    onLogin,
    onLogout,
    onUpdateUser,
    makeVerification
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
