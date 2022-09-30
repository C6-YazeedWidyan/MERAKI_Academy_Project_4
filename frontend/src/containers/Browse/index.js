import React, { useContext } from "react";
import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameCard from "../../components/GameCard";
import { AuthContext } from "../../contexts/AuthContext";

const Browse = () => {
  const { wishlist, userProfile, isLoggedIn, token, setWishList } =
    useContext(AuthContext);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();

  const getAllGames = () => {
    setPageNumber(pageNumber + 1);
    axios.get(`http://localhost:5000/games?p=${pageNumber}`).then((res) => {
      setData(res.data.games);
    });
  };

  const getAllCategoriesTitles = () => {
    axios
      .get("http://localhost:5000/category/all/")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGameByCategory = (title) => {
    axios
      .get(`http://localhost:5000/category?title=${title}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToDetails = (id) => {
    navigate("/gameDetails", {
      state: id,
    });
  };

  const addToWishList = (e, game_id) => {
    e.stopPropagation();
    if (isLoggedIn) {
      const data = {
        userId: userProfile._id,
        gameId: game_id,
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
    } else {
      navigate("/login");
    }
  };

  const deleteFromWishList = (e, game_id) => {
    e.stopPropagation();
    const data = {
      userId: userProfile._id,
      gameId: game_id,
    };
    axios
      .put(`http://localhost:5000/wishlist/delete`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newWishList = wishlist.filter((game) => {
          return game_id != game._id;
        });
        setWishList(newWishList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllGames();
    getAllCategoriesTitles();
  }, []);

  return (
    <>
      <div className="browse-container">
        <div className="browse-left-wrapper">
          <h3 className="all-btn" onClick={getAllGames}>
            All
          </h3>
          {categories.map((category) => {
            return (
              <h3
                onClick={() => {
                  getGameByCategory(category.category);
                }}
              >
                {category.category}
              </h3>
            );
          })}
        </div>
        <div className="browse-right-wrapper">
          {data.map((game) => {
            return (
              <GameCard
                title={game.name}
                price={game.price}
                image={game.poster}
                gameID={game._id}
                addOrRemoveWishList={
                  wishlist.find((item) => item._id === game._id)
                    ? (e) => deleteFromWishList(e, game._id)
                    : (e) => addToWishList(e, game._id)
                }
                onClick={() => goToDetails(game._id)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Browse;
