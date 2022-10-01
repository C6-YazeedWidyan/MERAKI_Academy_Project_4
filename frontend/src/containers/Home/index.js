import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import GameCard from "../../components/GameCard";
import { AuthContext } from "../../contexts/AuthContext";

const Home = () => {
  const { token, isLoggedIn, userProfile, wishlist, setWishList } =
    useContext(AuthContext);
  const [mostPopularGames, setMostPopularGames] = useState([]);
  const [gamesOnSale, setGamesOnSale] = useState([]);
  const [newReleasesGames, setNewReleasesGames] = useState([]);
  const [adsGames, setAdsGames] = useState([]);
  const [ADImage, setADImage] = useState("");
  const [ads, setAds] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/games/ads/${ads}`).then((res) => {
      console.log(res.data);
      setAdsGames(res.data);
      setADImage(res.data[0].cover);
    });
    axios
      .get(`http://localhost:5000/games/state/${"Most Popular"}`)
      .then((res) => {
        setMostPopularGames(res.data);
      });

    axios
      .get(`http://localhost:5000/games/state/${"Games On Sale"}`)
      .then((res) => {
        setGamesOnSale(res.data);
      });

    axios
      .get(`http://localhost:5000/games/state/${"New Releases"}`)
      .then((res) => {
        setNewReleasesGames(res.data);
      });
  }, []);

  const addToWishList = (e, game_id) => {
    e.stopPropagation();
    if (isLoggedIn) {
      const data = {
        userId: userProfile._id,
        gameId: game_id,
      };
      axios
        .put(`http://localhost:5000/wishlist`, data, {
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
    } else {
      navigate("/login");
    }
  };

  const deleteFromWishList = (e, game_id) => {
    e.stopPropagation();
    const data = {
      userId: userProfile._id,
      gameId: game_id,
    };
    axios
      .put(`http://localhost:5000/wishlist/delete`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newWishList = wishlist.filter((game) => {
          return game_id !== game._id;
        });
        setWishList(newWishList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToDetails = (id) => {
    navigate("/gameDetails", {
      state: id,
    });
  };

  return (
    <>
      <div className="home-container">
        <div className="ads-cards">
          <img className="ad-image-big-item" src={ADImage} alt="" />
          <div className="ads-card-list">
            {adsGames.map((game) => {
              return (
                <div
                  onClick={() => setADImage(game.cover)}
                  className="card-list-item"
                >
                  <img
                    className="ad-image-list-item"
                    src={game.poster}
                    alt=""
                  />
                  <div className="ads-game-name">{game.name}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="home-subtitle">Most Popular Games</div>
        <div className="home-grid">
          {mostPopularGames.map((game) => {
            return (
              <GameCard
                key={game._id}
                title={game.name}
                price={game.price}
                image={game.poster}
                gameID={game._id}
                addOrRemoveWishList={
                  wishlist.find((item) => item._id === game._id)
                    ? (e) => deleteFromWishList(e, game._id)
                    : (e) => addToWishList(e, game._id)
                }
                onClick={() => goToDetails(game._id)}
              />
            );
          })}
        </div>
        <div className="home-subtitle">Games On Sale</div>
        <div className="home-grid">
          {gamesOnSale.map((game) => {
            return (
              <GameCard
                key={game._id}
                title={game.name}
                price={game.price}
                image={game.poster}
                gameID={game._id}
                addOrRemoveWishList={
                  wishlist.find((item) => item._id === game._id)
                    ? (e) => deleteFromWishList(e, game._id)
                    : (e) => addToWishList(e, game._id)
                }
                onClick={() => goToDetails(game._id)}
              />
            );
          })}
        </div>
        <div className="home-subtitle">New Releases Games</div>
        <div className="home-grid">
          {newReleasesGames.map((game) => {
            return (
              <GameCard
                key={game._id}
                title={game.name}
                price={game.price}
                image={game.poster}
                gameID={game._id}
                addOrRemoveWishList={
                  wishlist.find((item) => item._id === game._id)
                    ? (e) => deleteFromWishList(e, game._id)
                    : (e) => addToWishList(e, game._id)
                }
                onClick={() => goToDetails(game._id)}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
