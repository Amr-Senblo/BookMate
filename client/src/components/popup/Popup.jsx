/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./Popup.scss";
import useClickOutside from "../../custom/useClickOutside";

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
          transform: isVisible ? "scale(1)" : "scale(0.8)",
          transition:
            "opacity 0.4s ease-in-out, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div className="popup__content__header">
          <h2>{showLogin ? "Login" : "Register"}</h2>
          <button
            className="popup__content__header__close"
            onClick={closePopup}
          >
            <span className="close-icon" />
            {/* <img src={CloseIcon} alt="close" width={18} height={18} /> */}
          </button>
        </div>
        {showLogin ? (
          <form className="popup__content__form">
            <label>
              <span className="label-name">Email</span>
              <input type="email" name="email" required />
            </label>
            <label>
              <span className="label-name">Password</span>
              <input type="password" name="password" required />
            </label>
            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="popup__content__form">
            <label>
              <span className="label-name">Email</span>
              <input type="email" name="email" required />
            </label>
            <label>
              <span className="label-name">Password</span>
              <input type="password" name="password" required />
            </label>
            <label>
              <span className="label-name">Confirm password</span>
              <input type="password" name="confirm-password" required />
            </label>
            <button type="submit">Register</button>
          </form>
        )}
        <p className="toggle-text">
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
