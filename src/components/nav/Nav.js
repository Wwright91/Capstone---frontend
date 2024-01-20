import "./Nav.scss";

import { Link, useNavigate } from "react-router-dom";
// import Logo from "../assets/Melanated-Diamonds.png";
// import Login from "../assets/login.png";
import { signOut } from "firebase/auth";
import auth from "../../base";

import Button from "react-bootstrap/Button";
import { Navbar } from "react-bootstrap";

import hero from "../../assets/hero.png";

// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Nav = ({ setOpenLoginModal }) => {
  const navigate = useNavigate();
  return (
    <Navbar className="nav">
      <Navbar.Brand>
        <Link to="/">
          <img className="nav__logo" src={hero} alt="hero" />
        </Link>
      </Navbar.Brand>

      {!auth.currentUser ? (
        <Button variant="dark" onClick={() => setOpenLoginModal(true)}>
          Create An Account / Log In
        </Button>
      ) : (
        <div className="nav__buttons">
          <Button variant="light">
            <Link to="/businesses">Browse Businesses</Link>
          </Button>{" "}
          <Button variant="light">
            <Link to="/resources">Browse Resources</Link>
          </Button>{" "}
          <Button variant="light">
            <Link to="/profile">User Profile</Link>
          </Button>{" "}
          <Button
            variant="dark"
            onClick={async () => {
              navigate("/");
              await signOut(auth);
            }}
          >
            Sign Out
          </Button>
        </div>
      )}
      {/* <AccountCircleIcon className="nav__accountIcon" /> */}
    </Navbar>
  );
};

export default Nav;
