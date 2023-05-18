import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.scss";
// import MenuIcon from "../../assets/svg/menu.svg";
import Popup from "../popup/Popup";
import { useGetWidth } from "../../custom/useDimension";
import { setMainWidth } from "../../redux/mainWidthSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "../../custom/useAuth";

const SideBar = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const auth = useAuth();

  const mainWidth = useGetWidth();
  const dispatch = useDispatch();

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    // console.log("auth from sidebar", auth);
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

  const logoutHandler = () => {
    auth.useLogout();
  };
  useEffect(() => {
    if (isCollapsed) {
      dispatch(setMainWidth(mainWidth - 200));
    } else {
      dispatch(setMainWidth(mainWidth - 400));
    }
  }, [isCollapsed, mainWidth]);

  return (
    <div className={`sidebar + ${isCollapsed ? " collapsed" : ""}`}>
      {console.log("auth", auth)}
      <button className="collapse" onClick={() => setIsCollapsed(!isCollapsed)}>
        <span className="icon">
          <span className="collapse-icon"></span>
        </span>
      </button>
      <div className="user">
        {auth.user.user ? (
          <>
            <button
              className="user-logout"
              alt="Logout"
              onClick={logoutHandler}
            >
              <span className="logout-icon"></span>
            </button>
            {isCollapsed ? null : (
              <div className="user-info">
                <img
                  className="user-image"
                  src="https://picsum.photos/200"
                  alt="user"
                />
                <div className="user-details">
                  <span className="user-name">{auth.user.user.name}</span>
                  <span className="user-stars">
                    {auth.user.user.saved.length} saved books
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              className="user-login-register"
              alt="Login/Register"
              onClick={openPopup}
            >
              <span className="login-register-text">Enter</span>
              <span className="logout-icon"></span>
            </button>
          </>
        )}
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/">
              {isCollapsed ? (
                <span className="icon">
                  <span
                    className={`explore-icon ${
                      selectedSection === "explore" ? " selected" : ""
                    }`}
                  ></span>
                </span>
              ) : (
                <>
                  <span
                    style={{
                      color:
                        selectedSection === "explore" ? "#20387E" : "#BCBED0",
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
                </>
              )}
            </Link>
          </li>
          <li>
            <Link to="/categories">
              {isCollapsed ? (
                <span className="icon">
                  <span
                    className={`categories-icon ${
                      selectedSection === "categories" ? " selected" : ""
                    }`}
                  ></span>
                </span>
              ) : (
                <>
                  <span
                    style={{
                      color:
                        selectedSection === "categories"
                          ? "#20387E"
                          : "#BCBED0",
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
                </>
              )}
            </Link>
          </li>
          {auth.user.user && (
            <li>
              <Link to="/saved">
                {isCollapsed ? (
                  <span className="icon">
                    <span
                      className={`saved-icon ${
                        selectedSection === "saved" ? " selected" : ""
                      }`}
                    ></span>
                  </span>
                ) : (
                  <>
                    <span
                      style={{
                        color:
                          selectedSection === "saved" ? "#20387E" : "#BCBED0",
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
                  </>
                )}
              </Link>
            </li>
          )}
          {auth.user.user && (
            <li>
              <Link to="/settings">
                {isCollapsed ? (
                  <span className="icon">
                    <span
                      className={`settings-icon ${
                        selectedSection === "settings" ? " selected" : ""
                      }`}
                    ></span>
                  </span>
                ) : (
                  <>
                    <span
                      style={{
                        color:
                          selectedSection === "settings"
                            ? "#20387E"
                            : "#BCBED0",
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
                  </>
                )}
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {isPopupOpen && <Popup onClose={closePopup} />}
    </div>
  );
};

export default SideBar;
