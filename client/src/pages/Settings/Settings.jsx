import React from "react";

import "./Settings.css";

const Settings = () => {
  return (
    <>
      <div className="settings-title">
        <h2>Settings</h2>
      </div>
      <div className="settings-warpper">
        {/* (name - email) - (password) - (photo) */}
        <div className="info-setting">
          <form className="info-form">
            <label>
              <span className="label-name">Username</span>
              <input type="text" name="username" required />
            </label>
            <label>
              <span className="label-name">Email</span>
              <input type="email" name="email" required />
            </label>
            <button type="submit">Save</button>
          </form>
        </div>

        <div className="vertical-line"></div>

        <div className="photo-setting">
          <img
            className="user-image"
            src="https://picsum.photos/200"
            alt="user photo"
          />
          <button className="change-photo-btn">Change Photo</button>
        </div>
        <div className="passowrd-setting"></div>
      </div>
    </>
  );
};

export default Settings;
