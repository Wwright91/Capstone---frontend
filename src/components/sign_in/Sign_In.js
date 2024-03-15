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
import { Link } from "@mui/material";
import hero from "../../assets/hero.png";

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
        {signIn ? (
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { my: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
            display="grid"
            justifyContent="center"
          >
            <Typography
              className="loginModal__title"
              id="modal-modal-title"
              variant="h4"
              component="h2"
              align="center"
            >
              Please Create An Account
            </Typography>
            <br />
            <div className="Sign_In__Form">
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
            </div>
            <div className="Sign_In__Buttons">
              <Button
                variant="contained"
                onClick={register}
                sx={{ width: 100, padding: 0, margin: 5 }}
              >
                Sign Up
              </Button>
              <img src={hero} alt="logo" height="130px" width="130px" />
            </div>
            <Typography align="center">
              Already Have An Account?{" "}
              <Link
                id="Log-In"
                onClick={(e) => handleToggle(e)}
                href="#"
                color="inherit"
              >
                Log In
              </Link>
            </Typography>
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
            <div style={{ display: "grid" }}>
              <img
                src={hero}
                alt="logo"
                height="200px"
                width="200px"
                style={{ margin: "auto" }}
              />
            </div>
            <Typography
              className="loginModal__title"
              id="modal-modal-title"
              variant="h4"
              component="h2"
              align="center"
            >
              Log In
            </Typography>
            <br />
            <div className="Sign_In__Form">
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
            </div>
            <div className="Sign_In__Buttons">
              <Button
                variant="contained"
                onClick={login}
                sx={{ width: 110, padding: 1, margin: 2 }}
              >
                Log In
              </Button>
            </div>
            <br />
            <Typography align="center">
              Don't Have An Account?{" "}
              <Link
                id="Sign-up"
                onClick={(e) => handleToggle(e)}
                href="#"
                color="inherit"
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}
