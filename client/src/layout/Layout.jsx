// import React from "react";
import "./layout.css";
import { Outlet } from "react-router-dom";
// import Navbar from "../components/navbar/Navbar";
// import CategoriesBar from "../components/CategoriesBar/CategoriesBar";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/SideBar/SideBar";

import { useSelector } from "react-redux";
import { useGetWidth } from "../custom/useDimension";
import { useEffect, useState } from "react";

const Layout = () => {
  const mainWidth = useSelector((state) => state.mainWidth.value);
  const [marginWidth, setmarginWidth] = useState(0);
  const screenWidth = useGetWidth();

  useEffect(() => {
    setmarginWidth(screenWidth - mainWidth);
    // console.log(screenWidth);
  }, [mainWidth, screenWidth]);

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div
        className="layoutContainer"
        style={{
          width: mainWidth - 5,
          marginLeft: marginWidth,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
