import { useEffect, useState } from "react";
import "./SectionHeader.scss";
// import { FaSearch } from "react-icons/fa";

import PropTypes from "prop-types";

import SearchIcon from "../../assets/svg/search.svg";

const SectionHeader = ({ title, data, onSearch, type }) => {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState("");

  const handleSearchClick = () => {
    let filteredData = [];
    if (type === "book") {
      filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(searchData.toLowerCase());
      });
    } else if (type === "category") {
      filteredData = data.filter((item) => {
        return item.name.toLowerCase().includes(searchData.toLowerCase());
      });
    }
    onSearch(filteredData);
    console.log(filteredData);
  };

  useEffect(() => {
    if (title === "Explore") setSearchText("book");
    else if (title === "Categories") setSearchText("category");
    else if (title === "Your saved books") setSearchText("saved book");
  }, [title]);

  useEffect(() => {
    handleSearchClick();
  }, [searchData]);

  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <div className="search-container">
        <img
          src={SearchIcon}
          alt="Search Icon"
          onClick={handleSearchClick}
          width={30}
          height={30}
          style={{
            margin: "0 1rem",
          }}
        />
        <input
          type="text"
          placeholder={`Find the ${searchText}`}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SectionHeader;

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onSearchClick: PropTypes.func,
  data: PropTypes.array,
  onSearch: PropTypes.func,
  type: PropTypes.string,
};
