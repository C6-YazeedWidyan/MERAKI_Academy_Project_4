import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import "./style.css";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [usersTotal, setUsersTotal] = useState(0);
  const [gamesTotal, setGamesTotal] = useState(0);
  const [ordersTotal, setOrdersTotal] = useState(0);
  const [orderTotalAmount, setOrderTotalAmount] = useState([]);

  const grandTotal = (arr) => {
    return arr.reduce((sum, i) => {
      return sum + i.total;
    }, 0);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/adminpanel/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsersTotal(res.data.usersTotal);
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
        setGamesTotal(res.data.gamesTotal);
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
        setOrdersTotal(res.data.ordersTotal);
        setOrderTotalAmount(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div>
          <div className="total-text">Live Users</div>
          <div className="total-number">{usersTotal}</div>
        </div>
        <div className="dashboard-card-image">image</div>
        {/* <img src="./asses" alt=""> */}
      </div>
      <div className="dashboard-card">
        <div>
          <div className="total-text">Items Total</div>
          <div className="total-number">{gamesTotal}</div>
        </div>
        <div className="dashboard-card-image">image</div>
        {/* <img src="./asses" alt=""> */}
      </div>
      <div className="dashboard-card">
        <div>
          <div className="total-text">Orders Total</div>
          <div className="total-number">{ordersTotal}</div>
        </div>
        <div className="dashboard-card-image">image</div>
        {/* <img src="./asses" alt=""> */}
      </div>
      <div className="dashboard-card">
        <div>
          <div className="total-text">Total Sales profit</div>
          <div className="total-number">${grandTotal(orderTotalAmount)}</div>
        </div>
        <div className="dashboard-card-image">image</div>
        {/* <img src="./asses" alt=""> */}
      </div>
    </div>
  );
};

export default Dashboard;
