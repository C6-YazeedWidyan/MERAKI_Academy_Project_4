import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

const Cart = () => {
  const { token, isLoggedIn, userProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5000/cart/${userProfile._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCart(res.data.cart.games);
        });
    }
  }, []);

  return (
    <>
      <div className="cart-container">
        {cart.map((game) => {
          return (
            <div key={game._id}>
              <h3>{game.name}</h3>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
