import React from "react";
import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Browse = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

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
        console.log(res);
        setCategories(res.data.categories);
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
        <h3>All</h3>
        {data.map((game) => {
          return (
            <div className="card">
              <img className="card-image" src={game.image} alt="" />
              <h3 className="game-name">{game.name}</h3>
              <span className="price"></span>
            </div>
          );
        })}

        <div className="category-container"></div>
      </div>
    </>
  );
};

export default Browse;
