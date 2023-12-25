import React from "react";
import { NavLink } from "react-router-dom";
import { elastic as Menu } from "react-burger-menu";
import { FcHome } from "react-icons/fc";
import { FaUserSecret, FaUserFriends } from "react-icons/fa";
import { GrNotes, GrStackOverflow } from "react-icons/gr";
import { GiMechanicGarage } from "react-icons/gi";
import { MdMiscellaneousServices, MdOutlineCreditCard } from "react-icons/md";
import { SiThemodelsresource } from "react-icons/si";
import { GiVerticalBanner } from "react-icons/gi";
import garageImg from "./../images/57014.jpg";

const SideBar = ({ children }) => {
  const onClickHandler = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };
  return (
    <div className="sidebar">
      <Menu className="bm-menu">
        <img src={garageImg} alt="garageImg" width={150} height={60} />
        <NavLink activeclassname="active" className="menu-item" to="/dashboard">
          <FcHome style={{ margin: "0px 5px 6px 0px" }} />
          Dashboard
        </NavLink>
        <NavLink className="menu-item" to="/banners">
          <GiVerticalBanner
            style={{ margin: "0px 5px 6px 0px", color: "red" }}
          />
          Banners
        </NavLink>
        <NavLink className="menu-item" to="/users">
          <FaUserSecret style={{ margin: "0px 5px 6px 0px", color: "red" }} />
          Users
        </NavLink>
        <NavLink className="menu-item" to="/bookings">
          <GrNotes style={{ margin: "0px 5px 5px 0px", background: "red" }} />
          Bookings
        </NavLink>
        <NavLink className="menu-item" to="/override">
          <GrStackOverflow
            style={{ margin: "0px 5px 5px 0px", color: "red" }}
          />
          Override
        </NavLink>
        <NavLink className="menu-item" to="/goaxled">
          <GiMechanicGarage
            style={{ margin: "0px 5px 5px 0px", color: "red" }}
          />
          GoAxled
        </NavLink>
        <NavLink className="menu-item" to="/services">
          <MdMiscellaneousServices
            style={{ margin: "0px 5px 5px 0px", color: "red" }}
          />
          Services
        </NavLink>
        <NavLink className="menu-item" to="/creditplan">
          <MdOutlineCreditCard
            style={{ margin: "0px 5px 5px 0px", color: "red" }}
          />
          Credit Plan
        </NavLink>
        <NavLink className="menu-item" to="/salesperson">
          <FaUserFriends style={{ margin: "0px 5px 5px 0px", color: "red" }} />
          Sales Person
        </NavLink>
        <NavLink className="menu-item" to="/partners">
          <FaUserFriends style={{ margin: "0px 5px 5px 0px", color: "red" }} />
          Partners
        </NavLink>
        <NavLink className="menu-item" to="/modal">
          <SiThemodelsresource
            style={{ margin: "0px 5px 5px 0px", color: "red" }}
          />
          Model
        </NavLink>
        {/* <NavLink> */}
        <a className="logout" onClick={onClickHandler}>
          Log Out
        </a>
        {/* </NavLink> */}
      </Menu>
      <main>{children}</main>
    </div>
  );
};

export default SideBar;
