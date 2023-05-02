/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./Popup.css";
import useClickOutside from "../../custom/useClickOutside";
import CloseIcon from "../../assets/svg/close_icon.svg";

const Popup = ({ onClose }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const popupRef = useRef(null);

  const toggleLoginRegister = () => {
    setShowLogin(!showLogin);
  };

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useClickOutside(popupRef, () => {
    closePopup();
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="popup">
      <div
        className="popup__content"
        ref={popupRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-50%)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <div className="popup__content__header">
          <h2>{showLogin ? "Login" : "Register"}</h2>
          <button
            className="popup__content__header__close"
            onClick={closePopup}
          >
            <img src={CloseIcon} alt="close" width={18} height={18} />
          </button>
        </div>
        {showLogin ? (
          <form className="popup__content__form">
            <label>
              Email
              <input type="email" name="email" required />
            </label>
            <label>
              Password
              <input type="password" name="password" required />
            </label>
            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="popup__content__form">
            <label>
              Email
              <input type="email" name="email" required />
            </label>
            <label>
              Password
              <input type="password" name="password" required />
            </label>
            <label>
              Confirm password
              <input type="password" name="confirm-password" required />
            </label>
            <button type="submit">Register</button>
          </form>
        )}
        <p>
          {showLogin
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <button
            className="popup__content__toggle"
            onClick={toggleLoginRegister}
          >
            {showLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Popup;
