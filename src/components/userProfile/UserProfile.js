import "./UserProfile.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import auth from "../../base";

import { useNavigate } from "react-router-dom";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Card from "../businessCard/BusinessCard";

const API = process.env.REACT_APP_API_URL;
export default function Profile({ currentUser, businesses }) {
  const [user, setUser] = useState([]);
  const [form, setForm] = useState({});
  const [favs, setFavs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`${API}/users/firebase/${currentUser?.uid}`)

        .then((res) => {
          setUser(res.data[0]);
          setForm(res.data[0]);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      axios
        .get(`${API}/users/user/${currentUser?.uid}/favorites`)
        .then((res) => setFavs(res.data));
    }
  }, [currentUser]);

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function removeFromFavorites() {
    // console.log(currentUser.uid);
    axios.delete(`${API}/users/user/${currentUser?.uid}/favorites`, businesses);
  }

  return (
    <div className="UserProfile">
      {auth.currentUser && (
        <>
          <h1> Welcome Back, {user?.first_name} </h1>
          <h2>Account Info</h2>
          <form>
            <label htmlFor="first">First</label>
            <input
              type="text"
              id="first_name"
              value={form?.first_name}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="last">Last</label>
            <input
              type="text"
              id="last_name"
              value={form?.last_name}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={form?.email}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="newUsername">Username</label>
            <input
              type="text"
              id="username"
              value={form?.username}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="newPassword">Password</label>
            <input
              type="password"
              id="password"
              value={form?.password}
              onChange={(e) => handleChange(e)}
            />{" "}
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>

          <h2>Favorites</h2>
          <div className="UserProfile__Favorites">
            {favs[0] ? (
              favs.map((business, index) => {
                return (
                  <div>
                    <Card business={business} key={index} />
                    <button onClick={removeFromFavorites}>Remove</button>
                  </div>
                );
              })
            ) : (
              <p>You haven't added any businesses to your favorites yet</p>
            )}
          </div>

          <div onClick={() => navigate("/add-business")}>
            <h3>Add a Business</h3>
            <AddHomeIcon />
          </div>
        </>
      )}
    </div>
  );
}
