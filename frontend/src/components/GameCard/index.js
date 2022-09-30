import React, { useState } from "react";
import "./style.css";

const GameCard = ({ image, title, price, onClick, addOrRemoveWishList }) => {
  const [display, setDisplay] = useState("notdisplayed");

  return (
    <div
      onMouseEnter={() => setDisplay("")}
      onMouseLeave={() => setDisplay("notdisplayed")}
      className="card-container"
      onClick={onClick}
    >
      <div className="card-image-container">
        <div
          onClick={addOrRemoveWishList}
          className={`${display} add-to-watchlist-btn`}
        >
          {addOrRemoveWishList.toString().includes("delete") ? "-" : "+"}
        </div>
        <img className="card-image" src={image} alt="game" />
      </div>
      <div className="card-title">{title}</div>
      <div className="card-price">{price}</div>
    </div>
  );
};

export default GameCard;
