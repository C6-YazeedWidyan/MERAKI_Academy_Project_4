import "./App.css";
import Router from "./router";
import { AuthContext } from "./contexts/AuthContext";
import axios from "axios";
import { useEffect, useContext } from "react";

function App() {
  const { token, isLoggedIn, userProfile, setCart, setWishList } =
    useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
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
          console.log(err);
        });
    }
  }, [token, isLoggedIn, userProfile]);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
