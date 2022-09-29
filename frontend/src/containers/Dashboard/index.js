import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Select from "react-select";

const Dashboard = () => {
  const { token, logout } = useContext(AuthContext);

  const [games, setGames] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [gameId, setGameId] = useState("");
  const [userId, setUserId] = useState("");
  console.log(gameId);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [poster, setPoster] = useState("");
  const [logo, setLogo] = useState("");
  const [cover, setCover] = useState("");
  const [ads, setAds] = useState(false);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("PC");
  const [inStock, setinStock] = useState(false);
  const [releaseDate, setReleaseDate] = useState("");

  const options = [
    { label: "action", value: "Action" },
    { label: "sport", value: "Sport" },
  ];

  const onChange = (opt) => {
    setCategories([...opt]);
  };

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

  const showEdit = (key) => {
    setIsEdit(true);
    setGameId(key);
  };

  const updateGame = (id) => {
    const category = categories.map((item) => item.value);
    console.log(id);
    axios
      .put(
        `http://localhost:5000/games/${id}`,
        {
          name,
          price,
          poster,
          logo,
          cover,
          ads,
          category,
          description,
          platform,
          inStock,
          releaseDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getAllGames();
        console.log(res);
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err);
        setIsEdit(false);
      });
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
          <div key={game._id} className="game">
            <div>{game.name}</div>
            <button
              className="delete-btn"
              onClick={() => {
                deleteGame(game._id);
              }}
            >
              Delete Game
            </button>
            <div className="update">
              {isEdit && gameId == game._id ? (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <br />
                    <input
                      type="number"
                      placeholder="Price"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Poster"
                      onChange={(e) => {
                        setPoster(e.target.value);
                      }}
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Logo"
                      onChange={(e) => {
                        setLogo(e.target.value);
                      }}
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Cover"
                      onChange={(e) => {
                        setCover(e.target.value);
                      }}
                    />
                    <br />
                    <input
                      type="text"
                      placeholder="Description"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    <br />
                    <select
                      onChange={(e) => {
                        setPlatform(e.target.value);
                      }}
                    >
                      <option value="PC">PC</option>
                      <option value="Nintendo Switch">Nintendo Switch</option>
                      <option value="PlayStation 4">PlayStation 4</option>
                      <option value="PlayStation 5">PlayStation 5</option>
                      <option value="Xbox One">Xbox One</option>
                      <option value="Xbox Series X/S">Xbox Series X/S</option>
                    </select>
                    <br />
                    <div>
                      <Select
                        isMulti
                        onChange={onChange}
                        options={options}
                        value={categories}
                      />
                    </div>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        checked={inStock}
                        onChange={() => {
                          setinStock(!inStock);
                        }}
                      />
                      in Stock
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        checked={ads}
                        onChange={() => {
                          setAds(!ads);
                        }}
                      />
                      Ads?
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder="Release Date"
                      onChange={(e) => {
                        setReleaseDate(e.target.value);
                      }}
                    />
                  </div>
                </>
              ) : null}
              {!isEdit ? (
                <button
                  className="update-btn-1"
                  onClick={() => {
                    showEdit(game._id);
                  }}
                >
                  Update
                </button>
              ) : null}
              {isEdit && gameId == game._id ? (
                <button
                  className="update-btn-2"
                  onClick={() => {
                    updateGame(game._id);
                  }}
                >
                  Update
                </button>
              ) : null}
            </div>
          </div>
        ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Dashboard;
