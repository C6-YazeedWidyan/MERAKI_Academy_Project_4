import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Search from "../Search";

const Header = () => {
  return (
    <div className="header-container">
      <div className="brandName">Store name</div>
      <Link className="link" to="browse">
        <div className="title">Browse</div>
      </Link>
      <Search />
      <div className="wrapper">
        <Link className="link" to="wishlist">
          <div className="title">Wishlist</div>
        </Link>
        <Link className="link" to="cart">
          <div className="title">Cart</div>
        </Link>
      </div>
      <div className="wrapper">
        <Link className="link" to="register">
          <div className="title">Register</div>
        </Link>
        <Link className="link" to="login">
          <div className="title">Login</div>
        </Link>
      </div>
    </div>
  );
};
export default Header;
