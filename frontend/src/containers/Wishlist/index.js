import React from "react";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

const Wishlist = () => {
  const { token, isLoggedIn, userProfile, wishlist, setWishList } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
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
          console.log(err);
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
      <div className="wishlist-container">
        {wishlist.map((game) => {
          return (
            <div key={game._id}>
              <img className="game-poster" src={game.poster} alt={game.name} />
              <div>
                <h3>{game.name}</h3>
                <h3>{game.price}</h3>
              </div>
              <button
                onClick={() => {
                  deleteFromWishList(game._id);
                }}
              >
                remove from wish list
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Wishlist;
