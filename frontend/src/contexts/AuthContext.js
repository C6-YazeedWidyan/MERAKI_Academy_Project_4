import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("user");
  const [token, setToken] = useState("");

  const saveToken = (token, userType) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserType(userType);
  };

  const logout = () => {
    setToken("");
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      saveToken(token, userType);
    }
    if (isLoggedIn && userType === "user") {
      navigate("/");
    }
    if (isLoggedIn && userType === "admin") {
      navigate("/dashboard");
    }
  }, [token, isLoggedIn, userType]);

  const state = {
    token,
    isLoggedIn,
    logout,
    saveToken,
    setIsLoggedIn,
    userType,
    setUserType,
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
