import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import "./style.css";

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/adminpanel/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/adminpanel/games", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5000/adminpanel/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <button>get all users</button>
      <button>get all games</button>
      <button>get all orders</button>
    </div>
  );
};

export default Dashboard;
