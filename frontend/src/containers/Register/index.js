import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const { setCart, setWishList, setUserType, setUserProfile } =
    useContext(AuthContext);
  const [token] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();

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
        login(email, password);
        setStatus(true);
        setMessage(res.data.message);
      })
      .catch((err) => {
        setStatus(false);
        setMessage(err.response.data.message);
      });
  };

  const login = (email, password) => {
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        setMessage("");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "userProfile",
          JSON.stringify(res.data.userProfile)
        );

        const data = {
          userId: res.data.userProfile._id,
        };

        axios
          .post("http://localhost:5000/cart", data, {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          })
          .then((res) => {
            setCart(res.data.cart.games);
          })
          .catch((err) => {
            setMessage(err.message);
          });

        axios
          .post("http://localhost:5000/wishlist", data, {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          })
          .then((result) => {
            setWishList(result.data.wishList.games);
          })
          .catch((err) => {
            setMessage(err.message);
          });
        setUserType(
          JSON.parse(localStorage.getItem("userProfile"))?.role?.role
        );
        setUserProfile(JSON.parse(localStorage.getItem("userProfile")));
        if (res.data.userProfile?.role?.role === "user") {
          navigate("/");
        } else {
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          return setMessage(err.response.data.message);
        }
        setMessage("Error happened while Login, please try again");
      });
  };

  return (
    <>
      <div className="register-container">
        <div className="login-text">Create Account</div>

        {!token ? (
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
    </>
  );
};
export default Register;
