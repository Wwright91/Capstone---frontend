import "./BusinessCard.scss";

import { useNavigate } from "react-router-dom";

// import {StarRating }from "../StarRating";
import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const API_key = process.env.REACT_APP_GOOGLE_API_KEY;
// const API_key = ""

export default function BusinessCard({ business, id, findBusinessByPlaceId }) {
  const [setBusinessDataFromAPI] = useState([]);

  const navigate = useNavigate();

  const placeId = findBusinessByPlaceId(Number(business.id) - 1);

  useEffect(() => {
    axios
      .get(`${API}/places/details?&place_id=${placeId}&key=${API_key}`)
      .then((res) => {
        // console.log("google api", placeId && res.data["result"])
        placeId && setBusinessDataFromAPI(res.data["result"]);
      })
      .catch((c) => console.error("catch", c));
  }, [placeId, setBusinessDataFromAPI]);

  return (
    <div
      key={id}
      className="businessCard"
      onClick={() => navigate(`/businesses/${business.id}`)}
    >
      <img
        src={business.img}
        alt={business.name}
        className="businessCard__img"
      />
      <div className="businessCard__name">{business.name}</div>
      {/* <StarRating rating={businessDataFromAPI.rating} /> */}
      <p>Established in {business.year_opened} </p>
    </div>
  );
}
