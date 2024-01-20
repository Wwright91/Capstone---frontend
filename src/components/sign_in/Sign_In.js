import "./Sign_In.scss";
import { useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../base";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const API = process.env.REACT_APP_API_URL;
export default function SignIn({ setOpenLoginModal }) {
  const navigate = useNavigate();

  const [signIn, setSignIn] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: "",
    newUsername: "",
    newPassword: "",
    email: "",
    first_name: "",
    last_name: "",
    login_email: "",
    favorites: null,
  });
  function handleToggle(e) {
    if (e.target.id === "Log-In") {
      setSignIn(false);
    }
    if (e.target.id === "Sign-up") {
      setSignIn(true);
    }
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  const register = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      axios.post(`${API}/users`, { ...form, uid: newUser?.user?.uid });
      setForm({ ...form, [e.target.id]: "" });
      setOpenLoginModal(false);
      navigate("/profile");
      console.log(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        form.login_email,
        form.password
      );
      setForm({ ...form, [e.target.id]: "" });
      setOpenLoginModal(false);
      navigate("/businesses");
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Sign_In">
      <div className="Sign_In__Container">
        <div className="Sign_In__Buttons">
          <button id="Log-In" onClick={(e) => handleToggle(e)}>
            Log In
          </button>
          <button id="Sign-up" onClick={(e) => handleToggle(e)}>
            Sign Up
          </button>
        </div>
        {signIn ? (
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { my: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography
              className="loginModal__title"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Please Create An Account
            </Typography>

            <TextField
              id="first_name"
              label="First Name"
              variant="outlined"
              required
              onChange={(e) => handleChange(e)}
              value={form.first_name}
            />
            <TextField
              id="last_name"
              label="Last Name"
              variant="outlined"
              required
              onChange={(e) => handleChange(e)}
              value={form.last_name}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              required
              onChange={(e) => handleChange(e)}
              value={form.email}
            />
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              required
              onChange={(e) => handleChange(e)}
              value={form.username}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              required
              onChange={(e) => handleChange(e)}
              value={form.password}
            />
            <Button variant="contained" onClick={register}>
              Sign Up
            </Button>
          </Box>
        ) : (
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { my: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography
              className="loginModal__title"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Please Log In
            </Typography>

            <TextField
              id="login_email"
              label="Email"
              variant="outlined"
              required
              onChange={(e) => handleChange(e)}
              value={form.login_email}
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              required
              onChange={(e) => handleChange(e)}
              value={form.password}
            />
            <Button variant="contained" onClick={login}>
              Log In
            </Button>
          </Box>
        )}
      </div>
    </div>
  );
}
