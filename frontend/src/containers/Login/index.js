import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import SnackBar from "../../components/SnackBar";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const { isLoggedIn, saveToken, setCart, setWishList } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const responseSuccessGoogle = (response) => {
    const data = {
      tokenId: response.credential,
    };
    axios
      .post("http://localhost:5000/googlelogin", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "userProfile",
          JSON.stringify(res.data.userProfile)
        );
        saveToken(res.data.token, res.data.userProfile.role.role);

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

        navigate("/");
        setStatus(true);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const responseErrorGoogle = (response) => {};

  const login = () => {
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        setMessage("");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "userProfile",
          JSON.stringify(res.data.userProfile)
        );
        saveToken(res.data.token, res.data.userProfile.role.role);

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

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });

  return (
    <>
      <div className="login-container">
        <div className="login-text">Welcome Back</div>
        <input
          className="auth-input"
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="auth-input"
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="login-btn" onClick={login}>
          Login
        </div>
        <br />
        <div className="google">
          <GoogleLogin
            onSuccess={responseSuccessGoogle}
            onError={responseErrorGoogle}
          />
        </div>
      </div>
      {message && <SnackBar message={message} setMessage={setMessage} />}
    </>
  );
};
export default Login;
