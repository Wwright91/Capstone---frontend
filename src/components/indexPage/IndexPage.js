import "./IndexPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import BusinessCard from "../businessCard/BusinessCard";
import { useSearchParams } from "react-router-dom";
import MapContainer from "../map/MapContainer";
import SearchBar from "../searchBar/SearchBar";

const API = process.env.REACT_APP_API_URL;

export default function IndexPage({ businesses, findBusinessByPlaceId }) {
  const [inputValue, setInputValue] = useState("");
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

  // const filterBySearch = filteredBusinesses.filter((business) => {
  //   return business.name.toLowerCase().includes(inputValue.toLowerCase()) || inputValue === "" && business.category === category || category === "";
  // });

  const filterBySearch = filteredBusinesses.filter((business) => {
    return (
      (business.name.toLowerCase().includes(inputValue.toLowerCase()) || inputValue === "") &&
      (business.category === category || category === "")
    );
  });

  // let businessesToDisplay = filterBySearch.length ? filterBySearch : filteredBusinesses
  const businessesToDisplay = (inputValue || category) ? filterBySearch : filteredBusinesses;
  
  console.log("filterBySearch", filterBySearch, "businessesToDisplay", businessesToDisplay)

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="IndexPage">
      <div className="IndexPage__Container">
        <div>
          <SearchBar filteredCategory={filteredCategory} businesses={businesses} onChange={handleChange}
            inputValue={inputValue} />
          <br/>
        <div className="IndexPage__Cards">
          {businessesToDisplay.map((business, id) => {
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
          <MapContainer businesses={businessesToDisplay} />
        </div>
      </div>
    </div>
  );
}
