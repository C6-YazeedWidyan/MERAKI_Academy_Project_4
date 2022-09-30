import React from "react";
import "./style.css";

const GameCard = ({ image, title, price, onClick, addOrRemoveWishList }) => {
  return (
    <div onClick={onClick} className="card-container">
      <div className="card-image-container">
        <div onClick={addOrRemoveWishList} className="add-to-watchlist-btn">
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
