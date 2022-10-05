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
import Dashboard from "../containers/Admin/Dashboard";
import { AuthContext } from "../contexts/AuthContext";
import AddNewGame from "../containers/Admin/AddNewGame";
import Checkout from "../containers/Checkout";
import Admin from "../containers/Admin";
import ProductsList from "../containers/Admin/ProductsList";
import CheckoutSuccess from "../components/CheckoutSuccess/CheckoutSuccess";
import ContactUs from "../components/ContactUs/ContactUs";

const Router = () => {
  const { userType, isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {userType === "user" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productsList" element={<ProductsList />} />
          <Route path="addNewGame" element={<AddNewGame />} />
        </Route>
        <Route path="browse" element={<Browse />} />
        <Route path="gameDetails" element={<GameDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout-success" element={<CheckoutSuccess />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="wishlist" element={<Wishlist />} />
        {!isLoggedIn && (
          <>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </>
        )}
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export default Router;
