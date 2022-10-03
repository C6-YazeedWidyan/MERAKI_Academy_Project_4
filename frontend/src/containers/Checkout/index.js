import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

const Checkout = () => {
  const { token, userProfile, cart, setCart } = useContext(AuthContext);
  const grandTotal = (arr) => {
    return arr.reduce((sum, i) => {
      return sum + i.price;
    }, 0);
  };

  const handleCheckout = () => {
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
        console.log(err.message);
      });

    const data2 = {
      userId: userProfile._id,
      cart: cart,
      total: grandTotal(cart),
    };
    const data3 = { userId: userProfile._id };
    axios
      .post("http://localhost:5000/order", data2, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .put("http://localhost:5000/cart/emptycart/", data3, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCart([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleCheckout();
  }, []);

  const makeOrder = () => {};

  return (
    <div>
      <button onClick={makeOrder}>pay</button>
    </div>
  );
};

export default Checkout;
