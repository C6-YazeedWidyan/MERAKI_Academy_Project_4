import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("6330a779bd50d1f79ff6fca6");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  const registerNewUser = () => {
    axios
      .post("http://localhost:5000/users", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
        role,
      })
      .then((res) => {
        setStatus(true);
        setMessage(res.data.message);
      })
      .catch((err) => {
        setStatus(false);
        setMessage(err.response.data.message);
      });
  };

  return (
    <>
      <div className="register-container">
        <div className="login-text">Create Account</div>

        {!isLoggedIn ? (
          <>
            <input
              className="auth-input"
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              className="auth-input"
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <input
              className="auth-input"
              type="text"
              placeholder="Age"
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
            <input
              className="auth-input"
              type="text"
              placeholder="Country"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="register-btn" onClick={registerNewUser}>
              Register
            </div>
            {status
              ? message && <div className="succes-msg">{message}</div>
              : message && <div className="error-msg">{message}</div>}
          </>
        ) : (
          <p>Logout First</p>
        )}
      </div>
      <div id="signInDiv"></div>
    </>
  );
};
export default Register;
