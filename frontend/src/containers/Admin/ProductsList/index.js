import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import Select from "react-select";
import EditProductDialog from "../../../components/EditProductDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductsList = () => {
  const { token } = useContext(AuthContext);
  const [games, setGames] = useState("");
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(4);
  const [pageNumber, setPageNumber] = useState(0);
  const [message, setMessage] = useState("");
  const [gameDetails, setGameDetails] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const getAllGames = async () => {
    setPageNumber(pageNumber + 1);
    setLimit(limit * 2);
    try {
      const res = await axios.get(
        `http://localhost:5000/games?limit=${limit}&?page=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setGames(res.data.games);
        setMessage("");
        setShow(true);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  const showEdit = (game) => {
    setIsEdit(true);
    setGameDetails(game);
  };

  const deleteGame = (id) => {
    axios
      .delete(`http://localhost:5000/games/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newGames = games.filter((game) => {
          return id !== game._id;
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
      <table>
        <caption>Products List</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Platform</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {show &&
            games.map((game) => (
              <tr>
                <td data-label="Name">{game.name}</td>
                <td data-label="Price">${game.price}</td>
                <td data-label="Platform">{game.platform}</td>
                <td data-label="Actions">
                  <div className="actions-btns">
                    <div className="edit-btn" onClick={() => showEdit(game)}>
                      <FontAwesomeIcon color="green" icon={faPen} />
                    </div>
                    <div
                      className="edit-btn"
                      onClick={() => {
                        deleteGame(game._id);
                      }}
                    >
                      <FontAwesomeIcon color="red" icon={faTrash} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isEdit && (
        <EditProductDialog
          gameDetails={gameDetails}
          setIsEdit={setIsEdit}
          games={games}
          setGames={setGames}
        />
      )}
      {message && <div>{message}</div>}
      <button onClick={getAllGames}>get more games</button>
    </>
  );
};

export default ProductsList;
