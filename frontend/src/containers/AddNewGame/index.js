import React, { useContext } from "react";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import Select from "react-select";

const options = [
  { label: "action", value: "Action" },
  { label: "sport", value: "Sport" },
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
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [platform, setPlatform] = useState("PC");
  const [inStock, setinStock] = useState(false);
  const [releaseDate, setReleaseDate] = useState("");

  const addNewGame = () => {
    const category = categories.map((item) => item.value);

    axios
      .post(
        "http://localhost:5000/games",
        {
          name,
          price,
          image,
          image2,
          description,
          releaseDate,
          platform,
          category,
          inStock,
        },
        config
      )
      .then((res) => {
        console.log(res);
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
          placeholder="Image"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Image 2"
          onChange={(e) => {
            setImage2(e.target.value);
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
        <input
          type="text"
          placeholder="Release Date"
          onChange={(e) => {
            setReleaseDate(e.target.value);
          }}
        />
        <br />
        <button onClick={addNewGame}>Add New Game</button>
      </div>
    </>
  );
};

export default AddNewGame;
