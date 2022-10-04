import React, { useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Search from "../Search";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { logout, isLoggedIn, cart } = useContext(AuthContext);

  return (
    <div className="header-container">
      <Link className="link" to="/">
        <img className="logo" src="/assets/images/logo.png" alt="" />
      </Link>
      <Link className="link" to="/browse">
        <div className="title">Browse</div>
      </Link>
      <Search />
      <div className="wrapper">
        <Link className="link" to="/wishlist">
          <div className="title">Wishlist</div>
        </Link>
        <Link className="link" to="/cart">
          <div className="title">
            Cart{" "}
            <span className="cart-circle">{isLoggedIn && cart.length}</span>
          </div>
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="logout-btn" onClick={logout}>
          Logout
        </div>
      ) : (
        <div className="wrapper">
          <Link className="link" to="/register">
            <div className="title">Register</div>
          </Link>
          <Link className="link" to="/login">
            <div className="title">Login</div>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Header;
