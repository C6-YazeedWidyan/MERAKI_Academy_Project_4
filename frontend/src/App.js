import "./App.css";
import Router from "./router";
import { AuthContext } from "./contexts/AuthContext";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import SnackBar from "./components/SnackBar";

function App() {
  const [message, setMessage] = useState("");
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
          setMessage(err.message);
        });
    }
  }, [token, isLoggedIn, userProfile]);

  return (
    <>
      <div className="App">
        <Router />
      </div>
      {message && <SnackBar message={message} setMessage={setMessage} />}
    </>
  );
}

export default App;
