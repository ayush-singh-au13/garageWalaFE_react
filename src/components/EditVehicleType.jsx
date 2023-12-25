import React, { useEffect, useState } from "react";
import axios from "axios";
// import { LoggedInToken } from "./../utils/tokenValidity";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

export const EditVehicleType = () => {
  const [name, setName] = useState("");
  const [credit, setCredit] = useState("");

  const queryParams = useLocation().search;
  const id = new URLSearchParams(queryParams).get("id");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/bookings/vehicleTypesById?id=${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setName(response.data.data[0].name);
          setCredit(response.data.data[0].credit);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleCreditChange = (event) => {
    event.preventDefault();
    setCredit(event.target.value);
  };

  // toast message
  const udpatesuccess = (message) =>
    toast.success(message, { autoClose: 1500 });
  const updatefailure = (message) => toast.error(message, { autoClose: 1500 });

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = `http://localhost:5000/api/v1/bookings/editVehicleType?id=${id}`;
    const payload = {
      name: name,
      credit: credit,
    };
    axios
      .patch(url, payload)
      .then((response) => {
        console.log(response);

        if (response.data.status === 200) {
          setTimeout(() => {
            localStorage.setItem("token", response.data.data.token);
            window.location.replace("/modal");
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
            <div className="form-group  mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
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
              onClick={handleSubmit}
            >
              Update
            </button>
            <NavLink className="btn btn-light" to="/modal">
              Back
            </NavLink>
          </div>
        </div>
      </form>
    </>
  );
};
