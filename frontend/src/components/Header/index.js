import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { cart, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [show, setShow] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [navigate]);

  const logout = () => {
    setToken("");
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="Navbar">
      <div className="Navbar-Link Navbar__Link-brand flex-01">
        <Link className="link" to="/">
          <img className="logo" src="/assets/images/logo.png" alt="" />
        </Link>
      </div>
      <div className="Navbar-Link Navbar-Link-toggle">
        <i
          onClick={() => {
            setShow(!show);
          }}
        >
          <FontAwesomeIcon color="white" icon={faBars} />
        </i>
      </div>
      <nav
        className={
          show ? "Navbar-Items Navbar-ToggleShow" : "Navbar-Items flex-1"
        }
      >
        <div className="Navbar-Link margin-30">
          <Link className="link" to="/browse">
            <div className="title">Browse</div>
          </Link>
        </div>
        <div className="Navbar-Link margin-30 flex-05">
          <Search />
        </div>
        <div className="Navbar-Link margin-20">
          <Link className="link" to="/wishlist">
            <div className="title">Wishlist</div>
          </Link>
        </div>
        <div className="Navbar-Link margin-20">
          <Link className="link" to="/cart">
            <div className="title">
              Cart <span className="cart-circle">{token && cart.length}</span>
            </div>
          </Link>
        </div>
      </nav>
      <nav
        className={
          show
            ? "Navbar-Items Navbar-Items--right Navbar-ToggleShow"
            : "Navbar-Items Navbar-Items--right"
        }
      >
        <div className="Navbar-Link">
          {token ? (
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
      </nav>
    </div>
  );
};
export default Header;
