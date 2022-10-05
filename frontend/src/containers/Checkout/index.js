import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import SnackBar from "../../components/SnackBar";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

const Checkout = () => {
  const [message, setMessage] = useState("");
  const { userProfile, cart } = useContext(AuthContext);

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
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  useEffect(() => {
    handleCheckout();
  }, []);

  return (
    <>
      <div></div>;
      {message && <SnackBar message={message} setMessage={setMessage} />}
    </>
  );
};

export default Checkout;
