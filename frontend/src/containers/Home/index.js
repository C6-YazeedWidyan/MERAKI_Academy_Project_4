import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/games/neworold/${"New"}`).then((res) => {
      setData(res.data);
    });
  }, []);

  const goToDetails = (id) => {
    navigate("/gameDetails", {
      state: id,
    });
  };

  return (
    <>
      <div className="home-container">
        <>
          {data.map((game) => {
            return (
              <div onClick={() => goToDetails(game._id)} key={game._id}>
                <div key={game.name}>{game.name}</div>
                <img className="card-image" src={game.image} alt="game" />
              </div>
            );
          })}
        </>
      </div>
      <Footer />
    </>
  );
};

export default Home;
