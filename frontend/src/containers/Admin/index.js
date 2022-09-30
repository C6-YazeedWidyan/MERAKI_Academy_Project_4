import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

const Admin = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([
    { name: "Dashboard", route: "dashboard" },
    { name: "Products", route: "productsList" },
    { name: "Add new game", route: "addNewGame" },
  ]);

  const handleTabs = (tab, index) => {
    setActiveTab(index);
    navigate(tab);
  };

  return (
    <div className="admin-container">
      <div className="admin-navbar">
        <div>
          <div>hello , username</div>
          <div>Welcome to your admin dashboard</div>
        </div>
        <div onClick={logout}>Logout</div>
      </div>
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
