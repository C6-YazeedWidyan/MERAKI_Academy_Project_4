import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
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
    setUserProfile(JSON.parse(localStorage.getItem("userProfile")));
    setUserType(JSON.parse(localStorage.getItem("userProfile"))?.role?.role);

    if (!JSON.parse(localStorage.getItem("userProfile"))?.role?.role) {
      setUserType("user");
    }

    if (token) {
      saveToken(token, userType);
    }
    if (isLoggedIn && userType === "user") {
      navigate("/");
    }
    if (isLoggedIn && userType === "admin") {
      navigate("/dashboard");
    }
  }, [token, isLoggedIn]);

  const state = {
    token,
    isLoggedIn,
    logout,
    saveToken,
    setIsLoggedIn,
    userType,
    setUserType,
    userProfile,
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
