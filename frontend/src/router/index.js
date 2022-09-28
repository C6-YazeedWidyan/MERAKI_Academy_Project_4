import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../containers/Login";
import Register from "../containers/Register";
import Browse from "../containers/Browse";
import Home from "../containers/Home";
import Cart from "../containers/Cart";
import Wishlist from "../containers/Wishlist";
import Header from "../components/Header";
import GameDetails from "../containers/GameDetails";
import Dashboard from "../containers/Dashboard";
import { AuthContext } from "../contexts/AuthContext";
import AddNewGame from "../containers/AddNewGame";

const Router = () => {
  const { userType } = useContext(AuthContext);

  return (
    <>
      {userType === "user" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addNewGame" element={<AddNewGame />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/gameDetails" element={<GameDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export default Router;
