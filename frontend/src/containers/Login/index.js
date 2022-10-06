import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    setCart,
    setWishList,
    setUserType,
    setUserProfile,
    setIsLoggedIn,
    setErrorMessage,
    setLoading,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
  }, []);

  setLoading(false);

  const responseSuccessGoogle = (response) => {
    setLoading(true);
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
        setLoading(false);
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
            setLoading(false);
          })
          .catch((err) => {
            setErrorMessage(err.message);
            setLoading(false);
          });

        axios
          .post("http://localhost:5000/wishlist", data, {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          })
          .then((result) => {
            setLoading(false);
            setWishList(result.data.wishList.games);
          })
          .catch((err) => {
            setLoading(false);
            setErrorMessage(err.message);
          });

        setIsLoggedIn(true);
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
        setErrorMessage(err.message);
      });
  };

  const responseErrorGoogle = (response) => {};

  const login = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "userProfile",
          JSON.stringify(res.data.userProfile)
        );
        setLoading(false);

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
            setLoading(false);
          })
          .catch((err) => {
            setErrorMessage(err.message);
            setLoading(false);
          });

        axios
          .post("http://localhost:5000/wishlist", data, {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          })
          .then((result) => {
            setWishList(result.data.wishList.games);
            setLoading(false);
          })
          .catch((err) => {
            setErrorMessage(err.message);
            setLoading(false);
          });
        setIsLoggedIn(true);
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
          return setErrorMessage(err.response.data.message);
        }
        setErrorMessage("Error happened while Login, please try again");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-text">Login with your Email</div>
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
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="login-btn" onClick={login}>
          Login
        </div>
        <br />
        <span>or</span>
        <br />
        <div className="google">
          <GoogleLogin
            onSuccess={responseSuccessGoogle}
            onError={responseErrorGoogle}
          />
        </div>
      </div>
    </>
  );
};
export default Login;
