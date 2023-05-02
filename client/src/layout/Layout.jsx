// import React from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";
// import Navbar from "../components/navbar/Navbar";
// import CategoriesBar from "../components/CategoriesBar/CategoriesBar";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";

const Layout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* <Navbar />
      <CategoriesBar /> */}
      <SideBar />
      <div className="layoutContainer">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
