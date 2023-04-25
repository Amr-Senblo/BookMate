import React from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import CategoriesBar from "../components/CategoriesBar/CategoriesBar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <CategoriesBar />
      <div class="layoutContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
