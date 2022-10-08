import React from "react";
import "./style.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const { setCart, setErrorMessage } = useContext(AuthContext);
  const [orderMsg, setOrderMsg] = useState("");
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const grandTotal = (arr) => {
    return arr.reduce((sum, i) => {
      return sum + i.price;
    }, 0);
  };

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCart(cart);
    const data = {
      userId: userProfile._id,
      userEmail: userProfile.email,
      cart: cart,
      total: grandTotal(cart),
    };
    const data1 = { userId: userProfile._id };
    axios
      .post("http://localhost:5000/order", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrderMsg(res.data.message);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });

    axios
      .put("http://localhost:5000/cart/emptycart/", data1, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCart([]);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }, []);

  return (
    <div className="success-checkout-container">
      <div className="success-checkout-wrapper">
        <img
          className="success-checkout-image"
          src="./assets/images/check.png"
          alt=""
        />
        <h1>THANK YOU FOR YOUR PURCHASE</h1>
        <div>
          We will email you the game installation code at provided email
        </div>
        <div className="success-checkout-btn" onClick={() => navigate("/")}>
          Continue Shopping
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
