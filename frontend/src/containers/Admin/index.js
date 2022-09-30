import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./style.css";

const Admin = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tabs, setTabs] = useState([
    { name: "Dashboard", route: "dashboard" },
    { name: "Products", route: "productsList" },
    { name: "Add new game", route: "addNewGame" },
  ]);

  return (
    <div class="admin-container">
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
        <div class="sidebar-img">
          <img src="/assets/images/logo.png" alt="logo" />
        </div>
        <div>
          {tabs.map((tab) => {
            return (
              <div onClick={() => navigate(tab.route)} className="sidebar-tab">
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
