// import React from "react";
import "./Footer.css";
import FooterLogo from "../../assets/svg/footer-logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="left">
        <img
          src={FooterLogo}
          alt="Logo"
          className="logo"
          width={300}
          height={300}
        />
      </div>
      <div className="right">
        <p>Contributors:</p>
        <ul className="contributors-list">
          <li>John Doe</li>
          <li>Jane Doe</li>
          <li>Mark Smith</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
