import React, { useContext } from "react";
import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameCard from "../../components/GameCard";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Browse = () => {
  const { wishlist, userProfile, setWishList, setLoading, setErrorMessage } =
    useContext(AuthContext);
  const [token] = useState(localStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);
  const [keyword, setKeyword] = useState("");
  const [showOption, setShowOption] = useState(false);
  const navigate = useNavigate();

  const getAllGames = () => {
    setKeyword("");
    axios
      .get(`http://localhost:5000/games?page=${page}`)
      .then((res) => {
        setLoading(false);
        setData(res.data.games);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const getAllCategoriesTitles = () => {
    axios
      .get("http://localhost:5000/category/all/")
      .then((res) => {
        setCategories(res.data.categories);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const getGameByCategory = (keyword) => {
    setKeyword(keyword);
    axios
      .get(`http://localhost:5000/category?title=${keyword}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const goToDetails = (id) => {
    navigate("/gameDetails", {
      state: id,
    });
  };

  const addToWishList = (e, game_id) => {
    e.stopPropagation();
    if (token) {
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
          setErrorMessage(err.message);
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
          return game_id !== game._id;
        });
        setWishList(newWishList);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    getAllGames();
    getAllCategoriesTitles();
  }, []);

  return (
    <div className="main-container">
      <div className="browse-container">
        <div className="browse-grid">
          {data.map((game) => {
            return (
              <GameCard
                key={game._id}
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
        <div className="browse-left-wrapper">
          <h3 className="all-btn" onClick={getAllGames}>
            All
          </h3>
          <div>
            <h3
              className="genre-btn"
              onClick={() => setShowOption(!showOption)}
            >
              <div>Genre</div>
              <div>
                {showOption ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </div>
            </h3>
            {showOption &&
              categories.map((category) => (
                <div
                  key={category.category}
                  style={
                    keyword == category.category
                      ? {
                          borderRadius: "4px",
                          padding: "12px",
                          backgroundColor: "rgb(32, 32, 32)",
                          color: "white",
                        }
                      : { borderRadius: "4px", padding: "12px", color: "white" }
                  }
                  className="category-item"
                  onClick={() => getGameByCategory(category.category)}
                >
                  {category.category}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="pagination-wrapper" onClick={getAllGames}>
        {data.map((item, i) => {
          return (
            <div
              key={i}
              onClick={() => setPage(i)}
              className={
                page === i
                  ? "activePage pagination-select"
                  : "pagination-select"
              }
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Browse;
