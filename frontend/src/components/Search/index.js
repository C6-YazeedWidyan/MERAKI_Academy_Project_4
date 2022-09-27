import React, { useState, useMemo } from "react";
import axios from "axios";
import "./style.css";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);

  // _.debounce(func, [(wait = 0)], [(options = {})]);

  const getData = (keyword) => {
    console.log(keyword);
    axios.get(`http://localhost:5000/search?keyword=${keyword}`).then((res) => {
      setSearchResult(res.data);
    });
  };

  // const debouncedResults = useMemo(() => {
  //   return debouce((e) => getData(e.target.value), 300);
  // }, []);

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
                <img className="card-image" src={game.image} alt="game" />
                <div>{game.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Search;
