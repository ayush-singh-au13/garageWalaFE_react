import React, { useState } from "react";
import axios from "axios";
import { LoggedInToken } from "./../utils/tokenValidity";
import { ToastContainer, toast } from "react-toastify";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const AddSalesPerson = () => {
  const genderData = [
    { id: 0, label: "Male" },
    { id: 1, label: "Female" },
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(genderData);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    setOpen(false);
  };
  // toast message
  const addsuccess = (message) => toast.success(message, { autoClose: 1500 });
  const addfailure = (message) => toast.error(message, { autoClose: 1500 });

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleMobileChange = (event) => {
    event.preventDefault();
    setMobile(event.target.value);
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  };
  //   const handleGenderChange = (event) => {
  //     event.preventDefault();
  //     setGender(event.target.value);
  //   };
  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = `http://localhost:5000/api/v1/user/registerUser?salesman=` + true;
    const payload = {
      name: name,
      email: email,
      mobile: mobile,
      address: address,
      password: password,
    };
    axios
      .post(url, payload)
      .then((response) => {
        console.log(response);
        if (response.data.status === 201) {
          setTimeout(() => {
            window.location.replace("/salesperson");
          }, 1000);
          addsuccess(response.data.message);
        } else {
          addfailure(response.data.message);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className="navbar">
        <span className="title">Add Salesperson</span>
        <Link className="home" to="/dashboard">
          Home
        </Link>
      </div>
      <ToastContainer />
      {/* <div className="Auth-form-container"> */}
      <form onSubmit={handleSubmit}>
        <div style={{ margin: "3rem 0rem 0 15rem" }}>
          <div className="form form2">
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Salesman Name*
              </label>
              <input
                autoFocus
                type="text"
                name=""
                value={name}
                className="form-control mt-1"
                placeholder="Salesman Name"
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>Email</label>
              <input
                type="email"
                name=""
                value={email}
                className="form-control mt-1"
                placeholder="Email"
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Mobile*
              </label>
              <input
                type="text"
                name=""
                value={mobile}
                className="form-control mt-1"
                placeholder="Mobile Number"
                onChange={handleMobileChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Password*
              </label>
              <input
                type="input"
                name=""
                value={password}
                className="form-control mt-1"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Address*
              </label>
              <input
                type="input"
                name=""
                value={address}
                className="form-control mt-1"
                placeholder="Address"
                onChange={handleAddressChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Gender*
              </label>
              <div className="form-control something2" style={{ cursor: "pointer"}}>
                <div onClick={toggleDropdown} className="something ">
                  {selectedItem
                    ? items.find((item) => item.id == selectedItem).label
                    : <span>Select Gender</span>}

                  <RiArrowDropDownLine
                    className={`fa fa-chevron-right  icon ${isOpen && "open"}`}
                  ></RiArrowDropDownLine>
                </div>
                <div className={`dropdown-body  ${isOpen && "open"}`}>
                  {items.map((item) => (
                    <div
                      className="dropdown-item"
                      onClick={(e) => handleItemClick(e.target.id)}
                      id={item.id}
                    >
                      <span
                        className={`dropdown-item-dot ${
                          item.id == selectedItem && "selected"
                        }`}
                      >
                        •{" "}
                      </span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="btn  btn-form">
            <button
              type="submit"
              className="btn btn-primary mr-2"
              // onClick={handleSubmit}
            >
              Submit
            </button>
            <NavLink className="btn btn-light" to="/salesperson">
              Back
            </NavLink>
          </div>
        </div>
      </form>
    </>
  );
};
