import React, { useContext, useEffect, useState } from "react";
import "./style.css";

import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { token } = useContext(AuthContext);

  const [games, setGames] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [gameId, setGameId] = useState(false);
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

  const handleUpdateClick = (game) => {
    setUpdateBox(!updateBox);
    setGameId(game._id);
    setTitle(game.name);
    setDescription(game.description);
    if (updateBox) updateGame(game._id);
  };

  const updateGame = async (id) => {
    try {
      await axios.put(`http://localhost:5000/articles/${id}`, {
        title,
        description,
      });
      getAllGames();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGame = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      getAllGames();
    } catch (error) {
      console.log(error);
    }
  };

  const addGame = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/articles/${id}/comments`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllGames();
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <>
      <br />
      {show &&
        games.map((game, index) => (
          <div key={index} className="game">
            <div>{game.name}</div>
          </div>
        ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Dashboard;
