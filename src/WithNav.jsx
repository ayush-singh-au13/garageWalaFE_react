import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";

const WithNav = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default WithNav;
