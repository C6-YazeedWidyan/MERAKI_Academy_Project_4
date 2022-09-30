import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const GameDetails = () => {
  const location = useLocation();
  const { token, userProfile, wishlist, setWishList, cart, setCart } =
    useContext(AuthContext);
  const [game, setGame] = useState({});
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/games/${location.state}`).then((res) => {
      setGame(res.data.game);
    });

    const foundInCart = cart.find((item) => {
      return item._id === location.state;
    });

    const foundInWish = wishlist.find((item) => {
      return item._id === location.state;
    });
    setInCart(foundInCart);
    setInWishlist(foundInWish);
  }, [cart, wishlist]);

  const addToCart = () => {
    const data = {
      userId: userProfile._id,
      gameId: game._id,
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
        console.log(err);
      });
  };

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
        const newCart = cart.filter((game) => {
          return id != game._id;
        });
        setCart(newCart);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
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
          return id != game._id;
        });
        setWishList(newWishList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="details-container">
      <div className="game-details-title">{game.name}</div>
      <div className="details-wrapper">
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
              add to wish list
            </div>
          )}
          <div className="info-wrapper">
            <div className="info-details">
              <div>release Date</div>
              <div>09/29/22</div>
            </div>
            <div className="info-details">
              <div>release Date</div>
              <div>09/29/22</div>
            </div>
            <div className="info-details">
              <div>release Date</div>
              <div>09/29/22</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
