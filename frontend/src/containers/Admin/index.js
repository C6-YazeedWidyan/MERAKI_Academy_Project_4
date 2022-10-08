import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [show, setShow] = useState(false);
  const { setUserType, setIsLoggedIn, userProfile } = useContext(AuthContext);
  const [tabs, setTabs] = useState([
    { name: "Dashboard", route: "dashboard" },
    { name: "Products", route: "productsList" },
    { name: "Add new game", route: "addNewGame" },
  ]);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserType("user");
    navigate("/login");
  };
  const handleTabs = (tab, index) => {
    setActiveTab(index);
    navigate(tab);
  };
  return (
    <div className="admin-container">
      <div className="admin-Navbar">
        <div className="admin-Navbar-Link admin-Navbar__Link-brand">
          <div>
            <div>
              Hello {userProfile.firstName} {userProfile.lastName}
            </div>
            <div>Welcome to your admin dashboard</div>
          </div>
        </div>
        <div className="admin-Navbar-Link admin-Navbar-Link-toggle">
          <i
            onClick={() => {
              setShow(!show);
            }}
          >
            <FontAwesomeIcon color="black" icon={faBars} />
          </i>
        </div>
        <nav
          className={
            show
              ? "admin-Navbar-Items admin-Navbar-ToggleShow"
              : "admin-Navbar-Items"
          }
        >
          <div className="admin-Navbar-Link">
            <Link className="admin-link" to="/admin/dashboard">
              <div className="admin-title">Dashboard</div>
            </Link>
          </div>
          <div className="admin-Navbar-Link margin-20">
            <Link className="admin-link" to="/admin/productsList">
              <div className="admin-title">Products List</div>
            </Link>
          </div>
          <div className="admin-Navbar-Link margin-30">
            <Link className="admin-link" to="/admin/addNewGame">
              <div className="admin-title">Add New Game</div>
            </Link>
          </div>
        </nav>
        <nav
          className={
            show
              ? "admin-Navbar-Items admin-Navbar-Items--right admin-Navbar-ToggleShow"
              : "admin-Navbar-Items admin-Navbar-Items--right"
          }
        >
          <div className="admin-Navbar-Link">
            <div className="logout-btn" onClick={logout}>
              Logout
            </div>
          </div>
        </nav>
      </div>

      {/* <div className="admin-navbar">
        <div>
          <div>hello </div>
          <div>Welcome to your admin dashboard</div>
        </div>
        <div onClick={logout}>Logout</div>
      </div> */}
      <main>
        <Outlet />
      </main>
      <div className="sidebar">
        <div className="sidebar-img">
          <img src="/assets/images/logo.png" alt="logo" />
          <div style={{ color: "white" }}>Admin Dashboard</div>
        </div>
        <div className="tabs-container">
          {tabs.map((tab, i) => {
            return (
              <div
                key={i}
                onClick={() => handleTabs(tab.route, i)}
                className="sidebar-tab"
                style={
                  activeTab == i
                    ? {
                        borderRadius: "4px",
                        padding: "12px",
                        backgroundColor: "#c62828",
                        color: "white",
                      }
                    : { borderRadius: "4px", padding: "12px", color: "white" }
                }
              >
                {tab.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
