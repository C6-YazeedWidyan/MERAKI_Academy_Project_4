import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import SnackBar from "../../components/SnackBar";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

const Checkout = () => {
  const { userProfile, cart, setLoading, setErrorMessage } =
    useContext(AuthContext);

  const handleCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const data = {
      cart: cart,
      userId: userProfile._id,
    };
    axios
      .post("http://localhost:5000/payment/create-checkout-session", data)
      .then((res) => {
        if (res.data.url) {
          setLoading(false);
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(err.message);
      });
  };

  useEffect(() => {
    handleCheckout();
    setLoading(true);
  }, []);

  return (
    <>
      <div></div>;
    </>
  );
};

export default Checkout;
