import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";
import SnackBar from "../../components/SnackBar";

const Cart = () => {
  const [message, setMessage] = useState("");
  const { userProfile, cart, setCart } = useContext(AuthContext);
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  console.log(cart);
  console.log(userProfile);
  useEffect(() => {
    if (!token) {
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
        })
        .catch((err) => {
          setMessage(err.message);
        });
    }
  }, []);

  const grandTotal = (arr) => {
    return arr.reduce((sum, i) => {
      return sum + i.price;
    }, 0);
  };

  const deleteFromCart = (id, gamePrice) => {
    const data = {
      userId: userProfile._id,
      gameId: id,
      total: grandTotal(cart) - gamePrice,
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
            return id !== game._id;
          });
          setCart(newCart);
        }
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="cart-container">
        <div className="page-title">Cart</div>
        <div className="cart-grid">
          {cart.length ? (
            <>
              <div className="cart-left-wrapper">
                {cart.map((game) => {
                  return (
                    <div className="cart-card" key={game._id}>
                      <div className="left-cart-card">
                        <img
                          className="cart-card-image"
                          src={game.poster}
                          alt="game"
                        />
                        <div className="cart-card-text">
                          <div className="cart-card-title">{game.name}</div>
                          <div className="cart-card-price">{game.price}</div>
                        </div>
                      </div>

                      <div
                        className="cart-outline-btn"
                        onClick={() => {
                          deleteFromCart(game._id, game.price);
                        }}
                      >
                        Remove
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cart-right-wrapper">
                <div className="cart-summary-title">Games Summary</div>
                <div className="cart-total-details">
                  <div>Total</div>
                  <div>${grandTotal(cart)}</div>
                </div>
                <div
                  className="cart-checkout-btn"
                  onClick={() => goToCheckout()}
                >
                  continue to checkout
                </div>
              </div>
            </>
          ) : null}
        </div>
        {!cart.length && (
          <div className="empty-list">
            <img
              className="empty-list-image"
              src="./assets/images/bankrupt.png"
              alt="empty"
            />
            <div className="empty-list-text">Your cart is empty.</div>
          </div>
        )}
      </div>
      {message && <SnackBar message={message} setMessage={setMessage} />}
    </>
  );
};

export default Cart;
