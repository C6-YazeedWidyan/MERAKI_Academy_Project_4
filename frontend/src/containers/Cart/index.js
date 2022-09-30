import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

const Cart = () => {
  const { token, isLoggedIn, userProfile, cart, setCart } =
    useContext(AuthContext);
  const navigate = useNavigate();

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

  const deleteFromCart = (id) => {
    const data = {
      userId: userProfile._id,
      gameId: id,
    };
    axios
      .put(`http://localhost:5000/cart/delete`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          const newCart = cart.filter((game) => {
            return id != game._id;
          });
          setCart(newCart);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="cart-container">
        <div className="cart-left-wrapper">
          {cart.map((game) => {
            return (
              <div className="cart-card" key={game._id}>
                <h3>{game.name}</h3>
                <button
                  onClick={() => {
                    deleteFromCart(game._id);
                  }}
                >
                  remove from cart
                </button>
              </div>
            );
          })}
        </div>
        <div className="cart-right-wrapper">
          <h3>total</h3>
          <button onClick={() => goToCheckout()}>continue to chechout</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
