import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [userProfile, setUserProfile] = useState({});
  const [userType, setUserType] = useState("user");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (token) {
      setToken(localStorage.getItem("token"));
      setUserProfile(JSON.parse(localStorage.getItem("userProfile")));
      setUserType(JSON.parse(localStorage.getItem("userProfile"))?.role?.role);
      axios
        .get(`http://localhost:5000/cart/${userProfile?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCart(res.data.cart.games);
        });

      axios
        .get(`http://localhost:5000/wishlist/${userProfile?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setWishList(res.data.wishList.games);
        })
        .catch((err) => {
          // setMessage(err.message);
        });
    }
  }, [token]);

  const state = {
    userType,
    setUserType,
    setUserProfile,
    userProfile,
    cart,
    setCart,
    wishlist,
    setWishList,
    isLoggedIn,
    setIsLoggedIn,
    setLoading,
    loading,
    errorMessage,
    setErrorMessage,
  };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
