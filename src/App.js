import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import SignIn from "./components/sign_in/Sign_In";
import IndexPage from "./components/indexPage/IndexPage";
import Nav from "./components/nav/Nav";
import Profile from "./components/userProfile/UserProfile";
import auth from "./base";
// import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
// import EditProfile from "./components/EditProfile";
import Show from "./components/businessPage/BusinessPage";
import Resources from "./components/resources/Resources";
import NewBusiness from "./components/newBusiness/NewBusiness";
import Footer from "./components/footer/Footer";
import LoginModal from "./components/loginModal/LoginModal";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";


const API = process.env.REACT_APP_API_URL;

function App() {
  const [currentUser, setcurrentUser] = useState(getAuth().currentUser||null);
  const [businesses, setBusinesses] = useState([]);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  useEffect(()=>{

    auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
    });

    setPersistence(getAuth(),browserLocalPersistence)

  }, [])

  useEffect(() => {
    axios
      .get(`${API}/businesses/`)
      .then((res) => {
        setBusinesses(res.data);
      })
      .catch((c) => console.error("catch", c));
  }, []);

  const findBusinessByPlaceId = (id) => {
    const match = businesses.find((business) => business.id === id);
    if (match) {
      return match.place_id;
    }
  };

  return (
    <Router>
      <Nav
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
      <LoginModal
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn currentUser={currentUser}/>} />
        <Route
          path="/businesses"
          element={
            <IndexPage
              businesses={businesses}
              findBusinessByPlaceId={findBusinessByPlaceId}
            />
          }
        />
        <Route
          path="/businesses/:id"
          element={<Show findBusinessByPlaceId={findBusinessByPlaceId} />}
        />
        <Route path="/profile" element={<Profile businesses={businesses} currentUser={currentUser} />} />
        {/* <Route path="/profile/edit/:user" element={< EditProfile/>} /> */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/new" element={<NewBusiness />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
