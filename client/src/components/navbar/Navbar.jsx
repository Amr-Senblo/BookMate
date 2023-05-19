// import React from "react";
import Logo from "../../assets/svg/logo-monochrome.svg";
import searchIcon from "../../assets/png/search-interface-symbol.png";
import "./Navbar.css";
import { useState } from "react";
import Popup from "../popup/Popup";

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="navbar__search">
        <input type="text" placeholder="Search for books" />
        <button>
          <img
            src={searchIcon}
            alt="search"
            width={20}
            height={20}
            className="navbar__search-icon"
          />
        </button>
      </div>
      <button className="navbar__button" onClick={openPopup}>
        LOGIN / REGISTER
      </button>
      {isPopupOpen && <Popup onClose={closePopup} />}
    </div>
  );
};

export default Navbar;
