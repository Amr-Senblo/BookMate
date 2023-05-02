import React from "react";
import "./SectionHeader.scss";
// import { FaSearch } from "react-icons/fa";

import SearchIcon from "../../assets/svg/search.svg";

const SectionHeader = ({ title, onSearchClick }) => {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <div className="search-container">
        <img
          src={SearchIcon}
          alt="Search Icon"
          onClick={onSearchClick}
          width={30}
          height={30}
          style={{
            margin: "0 1rem",
          }}
        />
        <input type="text" placeholder="Find the book" />
        {/* <span className="search-icon"> */}

        {/* </span> */}
      </div>
    </div>
  );
};

export default SectionHeader;
