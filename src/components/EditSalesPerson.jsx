import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoggedInToken } from "./../utils/tokenValidity";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

export const EditSalesPerson = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const queryParams = useLocation().search;
  const id = new URLSearchParams(queryParams).get("id");

  useEffect(() => {
    LoggedInToken();
    axios
      .get(`http://localhost:5000/api/v1/user/getUserById?id=${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setName(response.data.data.name);
          setMobile(response.data.data.mobile);
          setEmail(response.data.data.email);
          setAddress(response.data.data.address);
          setGender(response.data.data.gender);
          // setPassword(response.data.data.password);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const handleAddressChange = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  };
  const handleMobileChange = (event) => {
    event.preventDefault();
    setMobile(event.target.value);
  };

  // toast message
  const udpatesuccess = (message) =>
    toast.success(message, { autoClose: 1500 });
  const updatefailure = (message) => toast.error(message, { autoClose: 1500 });

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = `http://localhost:5000/api/v1/user/editUserById?id=` + id;
    const payload = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      address: address,
    };
    console.log(localStorage.getItem("token"), "==================>");
    axios
      .patch(url, payload, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response);

        if (response.data.status === 200) {
          setTimeout(() => {
            window.location.replace("/salesperson");
          }, 1000);
          udpatesuccess(response.data.message);
        } else {
          updatefailure(response.data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="navbar">
        <span className="title">Edit Models</span>
        <Link className="home" to="/dashboard">
          Home
        </Link>
      </div>
      <ToastContainer />

      {/* <div className="Auth-form-container"> */}
      <form onSubmit={handleSubmit}>
        <div style={{ margin: "4rem 0rem 0 15rem" }}>
          <div className="form form2">
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>Name</label>
              <input
                autoFocus
                type="text"
                name=""
                value={name}
                className="form-control mt-1"
                placeholder="Sales Person"
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
              <label style={{ color: "#666", fontWeight: "700" }}>Mobile</label>
              <input
                type="text"
                name=""
                value={mobile}
                className="form-control mt-1"
                placeholder="Mobile"
                onChange={handleMobileChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Password
              </label>
              <input
                type="text"
                name=""
                value={password}
                className="form-control mt-1"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Address
              </label>
              <input
                type="text"
                name=""
                value={address}
                className="form-control mt-1"
                placeholder="Address"
                onChange={handleAddressChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>Gender</label>
              <input
                type="text"
                name=""
                value={gender}
                className="form-control mt-1"
                disabled={true}
              />
            </div>
          </div>
          <div  className="btn  btn-form">
            <button
              type="submit"
              className="btn btn-primary mr-2"
              onClick={handleSubmit}
            >
              Update
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
