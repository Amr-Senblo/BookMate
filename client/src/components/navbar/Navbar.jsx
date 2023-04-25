import React from "react";
import Logo from "../../assets/svg/logo-monochrome.svg";
import searchIcon from "../../assets/png/search-interface-symbol.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="navbar__search">
        <input type="text" placeholder="Search for books" />
        <button>
          <img src={searchIcon} alt="search" width={20} height={20} />
        </button>
      </div>
      <button className="navbar__button">LOGIN / REGISTER</button>
    </div>
  );
};

export default Navbar;
