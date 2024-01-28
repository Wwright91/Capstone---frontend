import "./IndexPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import BusinessCard from "../businessCard/BusinessCard";
import { useSearchParams } from "react-router-dom";
import MapContainer from "../map/MapContainer";
import SearchBar from "../searchBar/SearchBar";

const API = process.env.REACT_APP_API_URL;

export default function IndexPage({ businesses, findBusinessByPlaceId }) {
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");

  useEffect(() => {
    async function fetchData() {
      if (category) {
        await axios
          .get(`${API}/businesses?category=${category}`)
          .then((res) => {
            setFilteredBusinesses(res.data);
          })
          .catch((c) => console.error("catch", c));
      } else {
        setFilteredBusinesses(businesses);
      }
    }
    fetchData();
  }, [category, businesses, setFilteredBusinesses]);

  const filteredCategory = (e) => {
    setSearchParams({ category: e.target.id });
  };

  return (
    <div className="IndexPage">
      <div className="IndexPage__Container">
        <div>
          <SearchBar filteredCategory={filteredCategory} businesses={businesses} />
          <br/>
        <div className="IndexPage__Cards">
          {filteredBusinesses.map((business, id) => {
            return (
              <BusinessCard
                business={business}
                key={id}
                findBusinessByPlaceId={findBusinessByPlaceId}
              />
            );
          })}
          </div>
          </div>
        <div className="IndexPage__Map">
          <MapContainer businesses={filteredBusinesses} />
        </div>
      </div>
    </div>
  );
}
