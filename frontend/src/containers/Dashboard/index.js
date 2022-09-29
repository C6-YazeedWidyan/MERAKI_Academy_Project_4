import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);

  const [games, setGames] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  const getAllGames = async () => {
    try {
      const res = await axios.get("http://localhost:5000/games", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setGames(res.data.games);
        setMessage("");
        setShow(true);
        setUserId(res.data.userId);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  const deleteGame = (id) => {
    axios
      .delete(`http://localhost:5000/games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        const newGames = games.filter((game) => {
          return id != game._id;
        });
        setGames(newGames);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <>
      <div onClick={logout}>logout</div>
      <Link to={"/addnewgame"}>
        <div className="title">Add New Game</div>
      </Link>
      <br />
      {show &&
        games.map((game, index) => (
          <div key={index} className="game">
            <div>{game.name}</div>
            <button
              className="delete-btn"
              onClick={() => {
                deleteGame(game._id);
              }}
            >
              Delete Game
            </button>
          </div>
        ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Dashboard;
