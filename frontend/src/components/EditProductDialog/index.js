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
  const { token } = useContext(AuthContext);

  const [name, setName] = useState(gameDetails.name);
  const [price, setPrice] = useState(gameDetails.price);
  const [poster, setPoster] = useState("");
  const [logo, setLogo] = useState("");
  const [cover, setCover] = useState("");
  const [ads, setAds] = useState(false);
  const [categories, setCategories] = useState([
    { label: gameDetails.category[0], value: gameDetails.category[0] },
  ]);
  const [description, setDescription] = useState(gameDetails.description);
  const [platform, setPlatform] = useState("PC");
  const [state, setState] = useState("Most Popular");
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
        console.log(err);
        setIsEdit(false);
      });
    e.preventDefault();
  };

  const onChange = (opt) => {
    setCategories([...opt]);
  };

  return (
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
          <label>Category:</label>
          <br />
          <Select
            className="category-select"
            isMulti
            onChange={onChange}
            options={options}
            value={categories}
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
          <input className="update-btn" type="submit" value="Update" />
        </form>
      </div>
    </div>
  );
};

export default EditProductDialog;
