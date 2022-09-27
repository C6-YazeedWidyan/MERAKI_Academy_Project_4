import React from "react";
import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Browse = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/games/").then((res) => {
      setData(res.data.games);
    });

    axios
      .get("http://localhost:5000/category/all/")
      .then((res) => {
        setCategories(res.data.categories);
        console.log(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="browse-container">
        {data.map((game) => {
          return (
            <div className="card">
              <img className="card-image" src={game.image} alt="" />
              <h3 className="game-name">{game.name}</h3>
              <span className="price"></span>
            </div>
          );
        })}
        <div className="category-container">
          {categories.map((category) => {
            return (
              <div>
                <h2>{category.category}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Browse;
