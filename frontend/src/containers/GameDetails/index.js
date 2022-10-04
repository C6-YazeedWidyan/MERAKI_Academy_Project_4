import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import SnackBar from "../../components/SnackBar";

const GameDetails = () => {
  const location = useLocation();
  const { token, userProfile, wishlist, setWishList, cart, setCart } =
    useContext(AuthContext);
  const [game, setGame] = useState({});
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/games/${location.state}`)
      .then((res) => {
        setGame(res.data.game);
      })
      .catch((err) => {
        setMessage(err.message);
      });

    const foundInCart = cart.find((item) => {
      return item._id === location.state;
    });

    const foundInWish = wishlist.find((item) => {
      return item._id === location.state;
    });
    setInCart(foundInCart);
    setInWishlist(foundInWish);
  }, [cart, wishlist, location]);

  const grandTotal = (arr) => {
    return arr.reduce((sum, i) => {
      return sum + i.price;
    }, 0);
  };

  const addToCart = () => {
    const data = {
      userId: userProfile._id,
      gameId: game._id,
      total: grandTotal(cart) + game.price,
    };

    axios
      .put(`http://localhost:5000/cart`, data, {
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
  };

  const deleteFromCart = (id) => {
    const data = {
      userId: userProfile._id,
      gameId: id,
      total: grandTotal(cart) - game.price,
    };
    axios
      .put(`http://localhost:5000/cart/delete`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newCart = cart.filter((game) => {
          return id !== game._id;
        });
        setCart(newCart);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const addToWishList = () => {
    const data = {
      userId: userProfile._id,
      gameId: game._id,
    };

    axios
      .put(`http://localhost:5000/wishlist`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWishList(res.data.wishList.games);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const deleteFromWishList = (id) => {
    const data = {
      userId: userProfile._id,
      gameId: id,
    };
    axios
      .put(`http://localhost:5000/wishlist/delete`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newWishList = wishlist.filter((game) => {
          return id !== game._id;
        });
        setWishList(newWishList);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  return (
    <>
      <div className="details-container">
        <div className="game-details-title">{game.name}</div>
        <div className="game-details-grid">
          <div className="left-wrapper">
            <img className="details-cover-image" src={game.cover} alt="" />
            <div>{game.description}</div>
          </div>
          <div className="right-wrapper">
            <img className="details-logo-image" src={game.logo} alt="" />
            {inCart ? (
              <div
                className="cart-details-btn"
                onClick={() => {
                  deleteFromCart(game._id);
                }}
              >
                remove from cart
              </div>
            ) : (
              <div className="cart-details-btn" onClick={addToCart}>
                add to cart
              </div>
            )}
            {inWishlist ? (
              <div
                className="wishlist-details-btn"
                onClick={() => {
                  deleteFromWishList(game._id);
                }}
              >
                remove from Wishlist
              </div>
            ) : (
              <div className="wishlist-details-btn" onClick={addToWishList}>
                add to wishlist
              </div>
            )}
            <div className="info-wrapper">
              <div className="info-details">
                <div>release Date</div>
                <div>{game.releaseDate}</div>
              </div>
              <div className="info-details">
                <div>Genre</div>
                <div>{game.category?.join(" , ")}</div>
              </div>
              <div className="info-details">
                <div>Platform</div>
                <div>{game.platform}</div>
              </div>
              <div className="info-details">
                <div>In Stock</div>
                {game.inStock ? <div>in Stock</div> : <div>Out of stock</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {message && <SnackBar message={message} setMessage={setMessage} />}
    </>
  );
};

export default GameDetails;
