import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/games/neworold`, { newOrOld: "New" })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const goToDetails = (id) => {
    navigate("gameDetails", {
      state: id,
    });
  };

  return (
    <>
      <div className="home-container">
        {data.map((game) => {
          return (
            <div onClick={() => goToDetails(game._id)} key={game._id}>
              {game.name}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;