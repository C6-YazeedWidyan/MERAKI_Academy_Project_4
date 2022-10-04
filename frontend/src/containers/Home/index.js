import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import GameCard from "../../components/GameCard";
import { AuthContext } from "../../contexts/AuthContext";
import SnackBar from "../../components/SnackBar";

const Home = () => {
  const { token, isLoggedIn, userProfile, wishlist, setWishList } =
    useContext(AuthContext);
  const [mostPopularGames, setMostPopularGames] = useState([]);
  const [gamesOnSale, setGamesOnSale] = useState([]);
  const [newReleasesGames, setNewReleasesGames] = useState([]);
  const [adsGames, setAdsGames] = useState([]);
  const [ADImage, setADImage] = useState("");
  const [ADgameId, setADgameId] = useState("");
  const [ads, setAds] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/games/ads/${ads}`)
      .then((res) => {
        setAdsGames(res.data);
        setADImage(res.data[0].cover);
        setADgameId(res.data[0]._id);
      })
      .catch((err) => {
        setMessage(err.message);
      });
    axios
      .get(`http://localhost:5000/games/state/${"Most Popular"}`)
      .then((res) => {
        setMostPopularGames(res.data);
      })
      .catch((err) => {
        setMessage(err.message);
      });

    axios
      .get(`http://localhost:5000/games/state/${"Games On Sale"}`)
      .then((res) => {
        setGamesOnSale(res.data);
      })
      .catch((err) => {
        setMessage(err.message);
      });

    axios
      .get(`http://localhost:5000/games/state/${"New Releases"}`)
      .then((res) => {
        setNewReleasesGames(res.data);
      })
      .catch((err) => {
        setMessage(err.message);
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
          setMessage(err.message);
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
        setMessage(err.message);
      });
  };

  const handleClickOnGameAds = (cover, id) => {
    setADImage(cover);
    setADgameId(id);
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
          <img
            onClick={() => goToDetails(ADgameId)}
            className="ad-image-big-item"
            src={ADImage}
            alt="ad-image"
          />
          <div className="ads-card-list">
            {adsGames.map((game) => {
              return (
                <div
                  key={game._id}
                  onClick={() => handleClickOnGameAds(game.cover, game._id)}
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
      {message && <SnackBar message={message} setMessage={setMessage} />}
    </>
  );
};

export default Home;
