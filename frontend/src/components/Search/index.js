import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import SnackBar from "../SnackBar";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const getData = (keyword) => {
    setKeyword(keyword);
    axios
      .get(`http://localhost:5000/games/search?keyword=${keyword}`)
      .then((res) => {
        setSearchResult(res.data.slice(0, 3));
      })
      .catch((err) => {
        setMessage(err.message);
      });
  };

  const goToDetails = (id) => {
    navigate("/gameDetails", {
      state: id,
    });
    setSearchResult([]);
    setKeyword("");
  };

  const goToBrowse = () => {
    navigate("/browse");
    setSearchResult([]);
    setKeyword("");
  };

  return (
    <>
      <div className="search-container">
        <input
          onChange={(e) => getData(e.target.value)}
          className="search-input"
          type="text"
          placeholder="Search store"
          value={keyword}
        />
        {!!searchResult.length && keyword ? (
          <div className="search-box">
            {searchResult.map((game) => {
              return (
                <div
                  onClick={() => goToDetails(game._id)}
                  key={game._id}
                  className="card"
                >
                  <img
                    className="search-card-image"
                    src={game.poster}
                    alt="game"
                  />
                  <div className="search-card-title">{game.name}</div>
                </div>
              );
            })}
            {searchResult.length >= 3 && (
              <div className="search-view-more-btn" onClick={goToBrowse}>
                view more
              </div>
            )}
          </div>
        ) : (
          keyword && (
            <div className="search-box">
              <div className="no-matching-found">No matching titles found</div>
              <div className="search-view-more-btn" onClick={goToBrowse}>
                Browse all
              </div>
            </div>
          )
        )}
      </div>
      {message && <SnackBar message={message} setMessage={setMessage} />}
    </>
  );
};
export default Search;
