import React, { useState } from "react";

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  updatedUser: false,
  verifiedUser: false,
  onLogin: (token) => {},
  onLogout: () => {},
  onUpdateUser: () => {},
  afterVerification: ()=>{}
});

export const AuthProvider = (props) => {
  const t = localStorage.getItem("token");
  const [token, setToken] = useState(t);
  const [updatedUser, setUpdatedUser] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(false);

  function onUpdateUser() {
    setUpdatedUser(true);
  }

  function onLogin(t) {
    setToken(t);
    localStorage.setItem("token", t);
  }

  function onLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  function afterVerification(){
    setVerifiedUser(true)
  }

  const authContext = {
    token,
    isLoggedIn: !!token,
    updatedUser,
    verifiedUser,
    onLogin,
    onLogout,
    onUpdateUser,
    afterVerification
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
