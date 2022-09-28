import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const GameDetails = () => {
  const location = useLocation();
  const { token, userProfile } = useContext(AuthContext);
  const [game, setGame] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/games/${location.state}`).then((res) => {
      setGame(res.data.game);
    });
  }, []);

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
        console.log(res.data);
        console.log(res);
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
        console.log(res.data);
        console.log(res);
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
        <div onClick={addToCart}>add to cart</div>
        <div onClick={addToWishList}>add to wish list</div>
      </div>
    </>
  );
};

export default GameDetails;
