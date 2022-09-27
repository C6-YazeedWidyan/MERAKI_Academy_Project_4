import React, { useEffect, useState } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const GameDetails = () => {
  const location = useLocation();
  const [game, setGame] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/games/${location.state}`).then((res) => {
      setGame(res.data.game);
    });
  }, []);

  return (
    <>
      <div className="details-container">{game.name}</div>
    </>
  );
};

export default GameDetails;
