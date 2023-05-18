/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./Popup.scss";
import useClickOutside from "../../custom/useClickOutside";
import { useAuth } from "../../custom/useAuth";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Write your email rightly")
    .required("Email is required"),
  password: yup.string().min(8).required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Write your email rightly")
    .required("Email is required"),
  password: yup.string().required(),
});

const Popup = ({ onClose }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm({
    resolver: yupResolver(loginSchema),
  });

  const registerForm = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLoginForm,
  } = loginForm;
  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
    reset: resetSignUpForm,
  } = registerForm;

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

  useEffect(() => {
    console.log("auth.user", auth.user);
    if (auth.user.status === "success") {
      console.log("successed login");
      closePopup();
      resetLoginForm();
      resetSignUpForm();
      navigate("/");
    }
  }, [auth.user]);

  const loginSubmitHandler = (data) => {
    console.log("login data", data);
    const sendRequest = {
      email: data.email,
      password: data.password,
    };
    console.log("sendRequest", sendRequest);
    auth.useLogin(sendRequest);
  };

  const signUpSubmitHandler = (data) => {
    console.log("register data", data);
    const sendRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    };
    console.log(sendRequest);
    auth.useSignup(sendRequest);
  };

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
          <form
            className="popup__content__form"
            onSubmit={handleLoginSubmit(loginSubmitHandler)}
          >
            <label>
              <span className="label-name">Email</span>
              <input
                type="email"
                name="email"
                {...loginRegister("email")}
                required
              />
              {loginErrors.email && <p>{loginErrors.email.message}</p>}
            </label>
            <label>
              <span className="label-name">Password</span>
              <input
                type="password"
                name="password"
                {...loginRegister("password")}
                required
              />
              {loginErrors.password && <p>{loginErrors.password.message}</p>}
            </label>
            <button type="submit">Login</button>
          </form>
        ) : (
          <form
            className="popup__content__form"
            onSubmit={handleSignUpSubmit(signUpSubmitHandler)}
          >
            <label>
              <span className="label-name">Name</span>
              <input
                type="text"
                name="name"
                {...signUpRegister("name")}
                required
              />
              {signUpErrors.name && <p>{signUpErrors.name.message}</p>}
            </label>

            <label>
              <span className="label-name">Email</span>
              <input
                type="email"
                name="email"
                {...signUpRegister("email")}
                required
              />
              {signUpErrors.email && <p>{signUpErrors.email.message}</p>}
            </label>
            <label>
              <span className="label-name">Password</span>
              <input
                type="password"
                name="password"
                {...signUpRegister("password")}
                required
              />
              {signUpErrors.password && <p>{signUpErrors.password.message}</p>}
            </label>
            <label>
              <span className="label-name">Confirm password</span>
              <input
                type="password"
                name="passwordConfirm"
                {...signUpRegister("passwordConfirm")}
                required
              />
              {signUpErrors.passwordConfirm && (
                <p>{signUpErrors.passwordConfirm.message}</p>
              )}
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
