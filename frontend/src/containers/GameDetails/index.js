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
    <>
      <div className="details-container">
        <div>{game.name}</div>
        <img className="image" src={game.image} alt="" />
        <img className="image2" src={game.image2} alt="" />
        {inCart ? (
          <div
            onClick={() => {
              deleteFromCart(game._id);
            }}
          >
            remove from cart
          </div>
        ) : (
          <div onClick={addToCart}>add to cart</div>
        )}

        {inWishlist ? (
          <div
            onClick={() => {
              deleteFromWishList(game._id);
            }}
          >
            remove from Wishlist
          </div>
        ) : (
          <div onClick={addToWishList}>add to wish list</div>
        )}
      </div>
    </>
  );
};

export default GameDetails;
