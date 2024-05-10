import "./SearchBar.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ businesses, filteredCategory, inputValue, onChange }) => {
  // const [inputValue, setInputValue] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  let allCategories = [
    ...new Map(
      businesses.map((business) => [business.category, business])
    ).keys(),
  ];

  function getAllCategories() {
    setShowCategories(!showCategories);
  }

  return (
    <div className="SearchBar">
      {/* <form> */}
      <label htmlFor="input"></label>
      <input
        className="SearchBar__Input"
        type="text"
        value={inputValue}
        onChange={onChange}
        // required
      />
      <button className="SearchBar__Search">Search</button>
      <button className="SearchBar__Icon">&#x1F50D;</button>
      <button
        className="SearchBar__Categories__Button"
        onClick={getAllCategories}
      >
        <img src="/four-squares.png" alt="four-squares" />
      </button>
      {/* </form> */}
      {showCategories && (
        <div className="IndexPage__Categories">
          <ul>
            {allCategories.map((category) => (
              <Link to={`/businesses?category=${category}`} key={category}>
                <li key={category} id={category} onClick={filteredCategory}>
                  {category.split(" ")[0]}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
