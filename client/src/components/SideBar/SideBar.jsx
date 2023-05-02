import { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.scss";
import MenuIcon from "../../assets/svg/menu.svg";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedSection, setSelectedSection] = useState("explore");
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="user">
        <button className="user-logout" alt="Logout">
          <span className="logout-icon"></span>
        </button>
        <div className="user-info">
          <img
            className="user-image"
            src="https://picsum.photos/200"
            alt="user"
          />
          <div className="user-details">
            <span className="user-name">Username</span>
            <span className="user-stars">100 stars</span>
          </div>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/explore">
              {/* <span
                className={`icon explore ${
                  selectedSection === "explore" ? " selected" : ""
                }`}
              ></span> */}
              <span
                style={{
                  color: selectedSection === "explore" ? "#20387E" : "#BCBED0",
                }}
              >
                Explore
              </span>
              <span
                className={`arrow ${
                  selectedSection === "explore" ? " selected" : ""
                }`}
              />
            </Link>
          </li>
          <li>
            <Link to="/categories">
              {/* <span
                className={`icon categories ${
                  selectedSection === "categories" ? " selected" : ""
                }`}
              ></span> */}
              <span>Categories</span>
              <span
                className={`arrow ${
                  selectedSection === "categories" ? " selected" : ""
                }`}
              />
            </Link>
          </li>
          <li>
            <Link to="/saved">
              {/* <span
                className={`icon saved ${
                  selectedSection === "saved" ? " selected" : ""
                }`}
              ></span> */}
              <span>Saved</span>
              <span
                className={`arrow ${
                  selectedSection === "categories" ? " selected" : ""
                }`}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
