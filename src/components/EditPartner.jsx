import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoggedInToken } from "./../utils/tokenValidity";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

export const EditPartner = () => {
  const [name, setName] = useState("");
  const [credits, setCredits] = useState("");
  const [mobile, setMobile] = useState("");
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [mechanicId, setMechanicId] = useState("");

  const queryParams = useLocation().search;
  const id = new URLSearchParams(queryParams).get("id");

  console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/partners/getPartnerById?id=${id}`)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          setName(response.data.data.name);
          setCredits(response.data.data.credits);
          setAddress(response.data.data.address);
          setPincode(response.data.data.pincode);
          setEmail(response.data.data.email);
          setShopName(response.data.data.shopName);
          setMobile(response.data.data.mobile);
          setMechanicId(response.data.data.mechanicId);
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
    setCredits(event.target.value);
  };
  const handleAddressChange = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  };
  const handlePincodeChange = (event) => {
    event.preventDefault();
    setPincode(event.target.value);
  };
  const handleMobileChange = (event) => {
    event.preventDefault();
    setMobile(event.target.value);
  };
  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const handleShopNameChange = (event) => {
    event.preventDefault();
    setShopName(event.target.value);
  };

  // toast message
  const udpatesuccess = (message) =>
    toast.success(message, { autoClose: 1500 });
  const updatefailure = (message) => toast.error(message, { autoClose: 1500 });

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = `http://localhost:5000/api/v1/partners/editPartner?id=${id}`;
    const payload = {
      name: name,
      credits: credits,
      shopName : shopName,
      address : address,
      mobile : mobile,
      email : email,
      pincode : pincode,
    };
    axios
      .patch(url, payload)
      .then((response) => {
        console.log(response);

        if (response.data.status === 200) {
          setTimeout(() => {
            // localStorage.setItem("token", response.data.data.token);
            window.location.replace("/partners");
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
        <span className="title">Edit Partner</span>
        <Link className="home" to="/dashboard">
          Home
        </Link>
      </div>
      <ToastContainer />

      {/* <div className="Auth-form-container"> */}
      <form onSubmit={handleSubmit}>
        <div style={{margin: "4rem 0rem 0 15rem"}}>
          <div className="form form2">
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700"}}>
               Partner Name*
              </label>
              <input
                type="text"
                name=""
                value={name}
                className="form-control mt-1"
                placeholder="Partner Name"
                onChange={handleNameChange}
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
                placeholder="Mobile"
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
                placeholder="Pin Code"
                onChange={handlePincodeChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Address*
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
              <label style={{ color: "#666", fontWeight: "700" }}>
                Mechanic ID
              </label>
              <input
                type="number"
                name=""
                value={mechanicId}
                className="form-control mt-1"
                placeholder="Mechanic ID"
                disabled={true}
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
