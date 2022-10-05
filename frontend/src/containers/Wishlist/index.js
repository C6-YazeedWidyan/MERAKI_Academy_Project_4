import React from "react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";
import SnackBar from "../../components/SnackBar";

const Wishlist = () => {
  const [message, setMessage] = useState("");
  const [token] = useState(localStorage.getItem("token"));
  const { userProfile, wishlist, setWishList } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5000/wishlist/${userProfile._id}`, {
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
    }
  }, []);

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

  const goToDetails = (id) => {
    navigate("/gameDetails", {
      state: id,
    });
  };

  return (
    <>
      <div className="wishlist-container">
        <div className="page-title">Wishlist</div>
        <div className="wishlist-grid">
          {wishlist.length
            ? wishlist.map((game) => {
                return (
                  <div className="game-card" key={game._id}>
                    <img
                      onClick={() => goToDetails(game._id)}
                      className="game-poster"
                      src={game.poster}
                      alt={game.name}
                    />
                    <div>
                      <h3>{game.name}</h3>
                      <h3>{game.price}</h3>
                    </div>
                    <button
                      className="remove-from-wish-list-btn"
                      onClick={() => {
                        deleteFromWishList(game._id);
                      }}
                    >
                      Remove from wish list
                    </button>
                  </div>
                );
              })
            : null}
        </div>
        {!wishlist.length && (
          <div className="empty-list">
            <img
              className="empty-list-image"
              src="./assets/images/bankrupt.png"
              alt="empty"
            />
            <div className="empty-list-text">
              You haven't added anything to your wishlist yet.
            </div>
          </div>
        )}
      </div>
      {message && <SnackBar message={message} setMessage={setMessage} />}
    </>
  );
};

export default Wishlist;
