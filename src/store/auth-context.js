import React, { useState } from "react";

const AuthContext = React.createContext({
    token: null,
    isLoggedIn: false,
    onLogin: (token)=>{},
    onLogout: ()=>{}
})

export const AuthProvider=props=>{
    const t = localStorage.getItem('token') 
    const [token, setToken] = useState(t)

    function onLogin(t){
        setToken(t)
        localStorage.setItem('token', t)
    }

    function onLogout(){
        setToken(null)
        localStorage.removeItem('token')
    }

    const authContext = {
        token, isLoggedIn : !!token,
        onLogin, onLogout
    }

    return (
        <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
    )
}


export default AuthContext