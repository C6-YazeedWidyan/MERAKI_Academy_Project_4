import axios from "axios";
import React from "react";
import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        setMessage("");
        localStorage.setItem("token", res.data.token);
        navigate("/");
        setStatus(true);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setStatus(false);
          return setMessage(err.response.data.message);
        }
        setMessage("Error happened while Login, please try again");
      });
  };

  return (
    <>
      <div className="login-container">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button onClick={login}>Login</button>
        <br />
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </>
  );
};
export default Login;
