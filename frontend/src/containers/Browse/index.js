import React from "react";
import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Browse = () => {
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

  useEffect(() => {
    getAllGames();
    getAllCategoriesTitles();
  }, []);

  return (
    <>
      <div className="big">
        <div className="browse-container">
          {data.map((game) => {
            return (
              <div
                onClick={() => {
                  goToDetails(game._id);
                }}
                className="game-card"
              >
                <img className="game-poster" src={game.poster} alt="" />
                <h3 className="game-name">{game.name}</h3>
                <span className="price"></span>
              </div>
            );
          })}
        </div>

        <div className="category-container">
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
      </div>
    </>
  );
};

export default Browse;
