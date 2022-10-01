import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

const Checkout = () => {
  const { token, isLoggedIn, userProfile, cart, setCart } =
    useContext(AuthContext);

  const grandTotal = (arr) => {
    return arr.reduce((sum, i) => {
      return sum + i.price;
    }, 0);
  };

  const makeOrder = () => {
    const data = {
      userId: userProfile._id,
      cart: cart,
      total: grandTotal(cart),
    };
    const data2 = { userId: userProfile._id };
    axios
      .post("http://localhost:5000/order", data, {
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
      .put("http://localhost:5000/cart/emptycart/", data2, {
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

  return (
    <div>
      <button onClick={makeOrder}>pay</button>
    </div>
  );
};

export default Checkout;
