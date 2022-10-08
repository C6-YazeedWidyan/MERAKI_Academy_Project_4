import React, { useState, useContext } from "react";
import "./style.css";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import Select from "react-select";

const options = [
  { label: "Action", value: "Action" },
  { label: "Action-Adventure", value: "Action-Adventure" },
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
  const { setErrorMessage } = useContext(AuthContext);
  const [token] = useState(localStorage.getItem("token"));

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
  const [addNewGameMsg, setAddNewGameMsg] = useState("");

  const uploadPoster = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setPoster(base64);
  };

  const uploadLogo = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setLogo(base64);
  };

  const uploadCover = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setCover(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = (e) => {
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
        setAddNewGameMsg(res.data.message);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
    e.preventDefault();
  };

  const onChange = (opt) => {
    setCategories([...opt]);
  };

  return (
    <>
      <div className="add-product-content">
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
                className="input-field"
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
                className="input-field"
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
              <h3>{addNewGameMsg}</h3>
              <br />
            </div>
            <div className="product-form-right">
              <label>poster:</label>
              <br />
              <input
                className="image-input-field"
                type="file"
                required
                onChange={(e) => {
                  uploadPoster(e);
                }}
              />
              <br />
              <label>Logo:</label>
              <br />
              <input
                className="image-input-field"
                type="file"
                required
                onChange={(e) => {
                  uploadLogo(e);
                }}
              />
              <br />
              <label>Cover:</label>
              <br />
              <input
                className="image-input-field"
                type="file"
                required
                onChange={(e) => {
                  uploadCover(e);
                }}
              />
              {!!logo && !!cover && !!poster ? (
                <div className="photos-div">
                  <img src={cover} alt="cover" height="125px" />
                  <img src={poster} alt="poster" height="125px" />
                  <img src={logo} alt="logo" height="125px" />
                </div>
              ) : null}
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
          <input className="add-btn" type="submit" value="Save" />
        </form>
      </div>
    </>
  );
};

export default AddNewGame;
