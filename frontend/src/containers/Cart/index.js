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
        console.log(res);
        const newCart = cart.filter((game) => {
          return id != game._id;
        });
        setCart(newCart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="cart-container">
        {cart.map((game) => {
          return (
            <div key={game._id}>
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
    </>
  );
};

export default Cart;
