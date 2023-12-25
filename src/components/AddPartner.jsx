import React, { useState } from "react";
import axios from "axios";
import { LoggedInToken } from "./../utils/tokenValidity";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const AddPartner = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [credits, setCredits] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [shopName, setShopName] = useState("");

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
  const handleCreditChange = (event) => {
    event.preventDefault();
    setCredits(event.target.value);
  };
  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const handlePincodeChange = (event) => {
    event.preventDefault();
    setPincode(event.target.value);
  };
  const handleAddressChange = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  };
  const handleShopNameChange = (event) => {
    event.preventDefault();
    setShopName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let url = `http://localhost:5000/api/v1/partners/createPartner`;
    const payload = {
      name: name,
      email: email,
      mobile: mobile,
      credits: credits,
      shopName: shopName,
      address: address,
      pincode: pincode,
    };
    axios
      .post(url, payload)
      .then((response) => {
        console.log(response);

        if (response.data.status === 201) {
          setTimeout(() => {
            localStorage.setItem("token", response.data.data.token);
            window.location.replace("/partners");
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
        <span className="title">Add Partner</span>
        <Link className="home" to="/dashboard">
          Home
        </Link>
      </div>
      <ToastContainer />
      <ToastContainer />

{/* <div className="Auth-form-container"> */}
<form onSubmit={handleSubmit}>
  <div style={{margin: "3rem 0rem 0 15rem"}}>
    <div className="form form2">
      <div className="form-group mt-3">
        <label style={{ color: "#666", fontWeight: "700"}}>
          Partner Name*
        </label>
        <input
          autoFocus
          type="text"
          name=""
          value={name}
          className="form-control mt-1"
          placeholder="Partner Name"
          onChange={handleNameChange}
          required
        />
      </div>
      <div className="form-group mt-3">
        <label style={{ color: "#666", fontWeight: "700" }}>
          Credits*
        </label>
        <input
          type="text"
          name=""
          value={credits}
          className="form-control mt-1"
          placeholder="Credits"
          onChange={handleCreditChange}
        />
      </div>
      <div className="form-group mt-3">
        <label style={{ color: "#666", fontWeight: "700" }}>
          Email
        </label>
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
          Shop Name*
        </label>
        <input
          type="text"
          name=""
          value={shopName}
          className="form-control mt-1"
          placeholder="Shop Name"
          onChange={handleShopNameChange}
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
          Pincode*
        </label>
        <input
          type="text"
          name=""
          value={pincode}
          className="form-control mt-1"
          placeholder="Pincode"
          onChange={handlePincodeChange}
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
          className="form-control mt-1 address"
          placeholder="Address"
          onChange={handleAddressChange}
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
        to='/partners'
      >
        Back
      </NavLink>
    </div>
  </div>
</form>
    
    </>
  );
};
