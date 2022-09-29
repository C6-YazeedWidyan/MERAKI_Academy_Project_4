import React, { useContext } from "react";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Select from "react-select";

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

const AddNewGame = () => {
  const { token } = useContext(AuthContext);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [poster, setPoster] = useState("");
  const [logo, setLogo] = useState("");
  const [cover, setCover] = useState("");
  const [ads, setAds] = useState(false);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("PC");
  const [state, setState] = useState("Most Popular");
  const [inStock, setinStock] = useState(false);
  const [releaseDate, setReleaseDate] = useState("");
  const [message, setMessage] = useState("");

  const addNewGame = () => {
    const category = categories.map((item) => item.value);

    axios
      .post(
        "http://localhost:5000/games",
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
          state,
          releaseDate,
        },
        config
      )
      .then((res) => {
        console.log(res.data.message);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (opt) => {
    setCategories([...opt]);
  };

  return (
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
        <select
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
        <div>
          <Select
            className="category-select"
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
        <br />
        <button onClick={addNewGame}>Add New Game</button>
        <br />
        <h3>{message}</h3>
      </div>
    </>
  );
};

export default AddNewGame;
