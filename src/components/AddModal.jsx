import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoggedInToken } from "./../utils/tokenValidity";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


export const AddModal = () => {
  const [name, setName] = useState("");
  const [credit, setCredit] = useState("");

    // toast message
    const addsuccess = (message) => toast.success(message, { autoClose: 1500 });
    const addfailure = (message) => toast.error(message, { autoClose: 1500 });

  useEffect(() => {
  }, []);

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleCreditChange = (event) => {
    event.preventDefault();
    setCredit(event.target.value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    let url = `http://localhost:5000/api/v1/bookings/addVehicleType`;
    const payload = {
      name: name,
      credit: credit,
    };
    axios
      .post(url, payload)
      .then((response) => {
        console.log(response);

        if (response.data.status === 200) {
          setTimeout(() => {
            localStorage.setItem("token", response.data.data.token);
            window.location.replace("/modal");
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
        <span className="title">Add Model</span>
        <Link className="home" to="/dashboard">
          Home
        </Link>
      </div>
      <ToastContainer />

      {/* <div className="Auth-form-container"> */}
      <form onSubmit={handleSubmit}>
        <div style={{margin: "4rem 0rem 0 15rem"}}>
          <div className="form form2">
            <div className="form-group  mt-3">
              <label style={{ color: "#666", fontWeight: "700"}}>
                Vehicle Type*
              </label>
              <input
                autoFocus
                type="text"
                name=""
                value={name}
                className="form-control mt-1"
                placeholder="Vehicle Type"
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Credit*
              </label>
              <input
                type="text"
                name=""
                value={credit}
                className="form-control mt-1"
                placeholder="Credit"
                onChange={handleCreditChange}
              />
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
            <NavLink
              className="btn btn-light"
              to='/modal'
            >
              Back
            </NavLink>
          </div>
        </div>
      </form>
    </>
  );
};
