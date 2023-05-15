import { useEffect, useState } from "react";
import "./SectionHeader.scss";
// import { FaSearch } from "react-icons/fa";

import PropTypes from "prop-types";

import SearchIcon from "../../assets/svg/search.svg";

const SectionHeader = ({ title, onSearchClick }) => {
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (title === "Explore") setSearchText("book");
    else if (title === "Categories") setSearchText("category");
    else if (title === "Your saved books") setSearchText("saved book");
  }, []);

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
        <input type="text" placeholder={`Find the ${searchText}`} />
        {/* <span className="search-icon"> */}

        {/* </span> */}
      </div>
    </div>
  );
};

export default SectionHeader;

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onSearchClick: PropTypes.func,
};
