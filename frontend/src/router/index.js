import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Browse from "../containers/Browse";
import Home from "../containers/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="browse" element={<Browse />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
};

export default Router;
