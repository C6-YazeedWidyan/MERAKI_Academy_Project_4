import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../containers/Login";
import Register from "../containers/Register";
import Browse from "../containers/Browse";
import Home from "../containers/Home";
import Cart from "../containers/Cart";
import Wishlist from "../containers/Wishlist";
import Header from "../components/Header";

const Router = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="browse" element={<Browse />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export default Router;
