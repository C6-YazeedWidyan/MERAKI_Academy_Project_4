import React, { useContext, useEffect, useState } from "react";
import "./EditProductDialog.css";
import Select from "react-select";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const options = [
  { label: "Action", value: "Action" },
  { label: "Action-adventure", value: "Action-adventure" },
  { label: "Adventure", value: "Adventure" },
  { label: "Card Game", value: "Card Game" },
  { label: "Casual", value: "Casual" },
  { label: "City Builder", value: "City Builder" },
  { label: "Comedy", value: "Comedy" },
  { label: "Exploration", value: "Exploration" },
  { label: "Fighting", value: "Fighting" },
  { label: "First Person", value: "First Person" },
  { label: "Horror", value: "Horror" },
  { label: "Music", value: "Music" },
  { label: "Open World ", value: "Open World" },
  { label: "Puzzle", value: "Puzzle" },
  { label: "Racing", value: "Racing" },
  { label: "Retro", value: "Retro" },
  { label: "RPG", value: "RPG" },
  { label: "Shooter", value: "Shooter" },
  { label: "Simulation", value: "Simulation" },
  { label: "Space", value: "Space" },
  { label: "Sports", value: "Sports" },
  { label: "Strategy", value: "Strategy" },
  { label: "Survival", value: "Survival" },
];

const EditProductDialog = ({ gameDetails, setIsEdit, games, setGames }) => {
  const [token] = useState(localStorage.getItem("token"));
  const { setErrorMessage } = useContext(AuthContext);

  const [name, setName] = useState(gameDetails.name);
  const [price, setPrice] = useState(gameDetails.price);
  const [poster, setPoster] = useState(gameDetails.poster);
  const [logo, setLogo] = useState(gameDetails.logo);
  const [cover, setCover] = useState(gameDetails.cover);
  const [ads, setAds] = useState(false);
  const [categories, setCategories] = useState([
    { label: gameDetails.category[0], value: gameDetails.category[0] },
  ]);
  const [description, setDescription] = useState(gameDetails.description);
  const [platform, setPlatform] = useState(gameDetails.platform);
  const [state, setState] = useState(gameDetails.state);
  const [inStock, setinStock] = useState(gameDetails.inStock);
  const [releaseDate, setReleaseDate] = useState(gameDetails.releaseDate);

  useEffect(() => {
    const result = gameDetails.category.map((item) => ({
      label: item,
      value: item,
    }));

    setCategories(result);
  }, []);

  const handleSubmit = (e) => {
    const category = categories.map((item) => item.value);
    axios
      .put(
        `http://localhost:5000/games/${gameDetails._id}`,
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
          state,
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
        const newGames = games.map((game) => {
          if (game._id == gameDetails._id) {
            game.name = res.data.game.name;
            game.price = res.data.game.price;
            game.poster = res.data.game.poster;
            game.logo = res.data.game.logo;
            game.cover = res.data.game.cover;
            game.ads = res.data.game.ads;
            game.category = res.data.game.category;
            game.description = res.data.game.description;
            game.platform = res.data.game.platform;
            game.state = res.data.game.state;
            game.releaseDate = res.data.game.releaseDate;
            game.inStock = res.data.game.inStock;
          }
          return game;
        });
        setGames(newGames);
        setIsEdit(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsEdit(false);
      });
    e.preventDefault();
  };

  const onChange = (opt) => {
    setCategories([...opt]);
  };

  return (
    <>
      <div className="edit-dialog">
        <div className="edit-dialog-content">
          <span onClick={() => setIsEdit(false)} className="close-edit-dialog">
            &times;
          </span>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="product-form-wrapper">
              <div className="product-form-left">
                <label>Name:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={name}
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <br />
                <label>Price:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={price}
                  required
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <br />
                <label>Platform:</label>
                <br />
                <select
                  className="input-field-select"
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
                <label>State:</label>
                <br />
                <select
                  className="input-field-select"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                >
                  <option value="Most Popular">Most Popular</option>
                  <option value="New Releases">New Releases</option>
                  <option value="Recently Updated">Recently Updated</option>
                  <option value="Games On Sale">Games On Sale</option>``
                </select>
                <br />
                <label>Release date:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={releaseDate}
                  required
                  onChange={(e) => {
                    setReleaseDate(e.target.value);
                  }}
                />
                <br />
                <label>description:</label>
                <br />
                <textarea
                  className="input-textarea"
                  type="text"
                  value={description}
                  required
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />

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
              </div>
              <div className="product-form-right">
                <label>poster:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={poster}
                  required
                  onChange={(e) => {
                    setPoster(e.target.value);
                  }}
                />
                <br />
                <label>Logo:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={logo}
                  required
                  onChange={(e) => {
                    setLogo(e.target.value);
                  }}
                />
                <br />
                <label>Cover:</label>
                <br />
                <input
                  className="input-field"
                  type="text"
                  value={cover}
                  required
                  onChange={(e) => {
                    setCover(e.target.value);
                  }}
                />
                <br />
                <label>Category:</label>
                <br />
                <Select
                  className="category-select"
                  isMulti
                  onChange={onChange}
                  options={options}
                  value={categories}
                />
              </div>
            </div>
            <input className="update-btn" type="submit" value="Update" />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductDialog;
