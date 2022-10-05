import React from "react";
import "./style.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import SnackBar from "../SnackBar";

const CheckoutSuccess = () => {
  const { setCart } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [orderMsg, setOrderMsg] = useState("");
  const [token] = useState(localStorage.getItem("token"));

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
        console.log(res);
        setOrderMsg(res.data.message);
      })
      .catch((err) => {
        setMessage(err.message);
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
        setMessage(err.message);
      });
  }, []);

  return (
    <>
      <div>Checkout Success</div>
      <div>{orderMsg}</div>
      {message && <SnackBar message={message} setMessage={setMessage} />}
    </>
  );
};

export default CheckoutSuccess;
