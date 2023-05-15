import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.scss";
// import MenuIcon from "../../assets/svg/menu.svg";
import Popup from "../popup/Popup";

const SideBar = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const [user, setUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setSelectedSection("explore");
    } else if (path === "/categories") {
      setSelectedSection("categories");
    } else if (path === "/saved") {
      setSelectedSection("saved");
    } else if (path === "/settings") {
      setSelectedSection("settings");
    }
  }, [location]);

  return (
    <div className={`sidebar + ${isCollapsed ? " collapsed" : ""}`}>
      <button className="collapse" onClick={() => setIsCollapsed(!isCollapsed)}>
        <span className="collapse-icon"></span>
      </button>
      <div className="user">
        {user ? (
          <>
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
          </>
        ) : (
          <>
            <button
              className="user-login-register"
              alt="Login/Register"
              onClick={openPopup}
            >
              <span className="login-register-text">Login/Register</span>
              <span className="logout-icon"></span>
            </button>
          </>
        )}
      </div>

      <nav>
        <ul>
          <li>
            <Link
              to="/"
              // onClick={() => {
              //   setSelectedSection("explore");
              // }}
            >
              <span
                style={{
                  color: selectedSection === "explore" ? "#20387E" : "#BCBED0",
                  transition: "all 0.3s ease",
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
            <Link
              to="/categories"
              // onClick={() => {
              //   setSelectedSection("categories");
              // }}
            >
              {/* <span
                className={`icon categories ${
                  selectedSection === "categories" ? " selected" : ""
                }`}
              ></span> */}
              <span
                style={{
                  color:
                    selectedSection === "categories" ? "#20387E" : "#BCBED0",
                  transition: "all 0.3s ease",
                }}
              >
                Categories
              </span>
              <span
                className={`arrow ${
                  selectedSection === "categories" ? " selected" : ""
                }`}
              />
            </Link>
          </li>
          <li>
            <Link
              to="/saved"
              // onClick={() => {
              //   setSelectedSection("saved");
              // }}
            >
              <span
                style={{
                  color: selectedSection === "saved" ? "#20387E" : "#BCBED0",
                  transition: "all 0.3s ease",
                }}
              >
                Saved
              </span>
              <span
                className={`arrow ${
                  selectedSection === "saved" ? " selected" : ""
                }`}
              />
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              // onClick={() => {
              //   setSelectedSection("settings");
              // }}
            >
              <span
                style={{
                  color: selectedSection === "settings" ? "#20387E" : "#BCBED0",
                  transition: "all 0.3s ease",
                }}
              >
                Settings
              </span>
              <span
                className={`arrow ${
                  selectedSection === "settings" ? " selected" : ""
                }`}
              />
            </Link>
          </li>
        </ul>
      </nav>
      {isPopupOpen && <Popup onClose={closePopup} />}
    </div>
  );
};

export default SideBar;
