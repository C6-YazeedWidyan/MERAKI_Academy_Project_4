import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);

  const navigate = useNavigate();

  const getData = (keyword) => {
    axios
      .get(`http://localhost:5000/games/search?keyword=${keyword}`)
      .then((res) => {
        setSearchResult(res.data.slice(0, 3));
      });
  };

  const goToBrowse = () => {
    navigate("/browse");
  };

  return (
    <div className="search-container">
      <input
        onChange={(e) => getData(e.target.value)}
        className="search-input"
        type="text"
        placeholder="Search"
      />
      {!!searchResult.length && (
        <div className="search-box">
          {searchResult.map((game) => {
            return (
              <div key={game._id} className="card">
                <img className="card-image" src={game.poster} alt="game" />
                <div>{game.name}</div>
              </div>
            );
          })}
          <button onClick={goToBrowse}>view more games</button>
        </div>
      )}
    </div>
  );
};
export default Search;
