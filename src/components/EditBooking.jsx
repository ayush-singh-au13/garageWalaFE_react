import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoggedInToken } from "./../utils/tokenValidity";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { Modal } from "bootstrap";
import { TiTick } from "react-icons/ti";
import { Button } from "bootstrap";
import DropDown from "./DropDown";
import { Scrollbar } from "smooth-scrollbar-react";

export const EditBooking = () => {
  const [customerName, setCustomerName] = useState("");
  const [vehicleType, setVehicleTypes] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [followedUpBy, setFollowedUpBy] = useState("");
  const [reason, setReason] = useState("");
  const [partnerAssigned, setpartnerAssigned] = useState("");
  const [openClick, setOpenClick] = useState(false);
  const [partnerShow, setPartnerShow] = useState(false);

  const queryParams = useLocation().search;
  const id = new URLSearchParams(queryParams).get("id");

  useEffect(() => {
    LoggedInToken();
    axios
      .get(`http://localhost:5000/api/v1/bookings/viewBooking?id=${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setVehicleTypes(response.data.data.vehicleType);
          setCustomerName(response.data.data.customerName);
          setVehicleNo(response.data.data.vehicleNo);
          setAddress(response.data.data.address);
          setMobile(response.data.data.phone);
          setServiceType(response.data.data.serviceType);
          setStatus(response.data.data.status);
          setCity(response.data.data.city);
          setReason(response.data.data.reason);
          setFollowedUpBy(response.data.data.followedUpBy);
          setpartnerAssigned(response.data.data.partnerAssigned);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCustomerNameChange = (event) => {
    event.preventDefault();
    setCustomerName(event.target.value);
  };

  const handleVehicleTypeChange = (event) => {
    event.preventDefault();
    setVehicleTypes(event.target.value);
  };
  const handleVehicleNoChange = (event) => {
    event.preventDefault();
    setVehicleNo(event.target.value);
  };
  const handleAddressChange = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  };
  const handleCityChange = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };
  const handleMobileChange = (event) => {
    event.preventDefault();
    setMobile(event.target.value);
  };
  const handleStatusChange = (event) => {
    event.preventDefault();
    setStatus(event.target.value);
  };
  const handleServiceTypeChange = (event) => {
    event.preventDefault();
    setServiceType(event.target.value);
  };
  const handleReasonChange = (event) => {
    event.preventDefault();
    setReason(event.target.value);
  };
  const handleFollowedUpByChange = (event) => {
    event.preventDefault();
    setFollowedUpBy(event.target.value);
  };
  const handlePartnerAssignedChange = (event) => {
    event.preventDefault();
    setpartnerAssigned(event.target.value);
  };
  console.log("partnerAssigned", partnerAssigned);
  const handleNotConnected = (event) => {
    event.preventDefault();
    setOpenClick(true);
    setPartnerShow(false);
    setStatus("OVERRIDE");
  };

  const handlePushGoaxled = (event) => {
    event.preventDefault();
    setOpenClick(false);
    setPartnerShow(true);
    setStatus("GOAXLED");
  };

  //   const handleClose = (event) => {
  //     event.preventDefault();
  //     setModalShow(false);
  //     window.refresh(true);
  //   }

  // toast message
  const udpatesuccess = (message) =>
    toast.success(message, { autoClose: 1500 });
  const updatefailure = (message) => toast.error(message, { autoClose: 1500 });

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = `http://localhost:5000/api/v1/bookings/editBooking?id=${id}`;
    const payload = {
      customerName: customerName,
      vehicleNo: vehicleNo,
      vehicleType: vehicleType,
      phone: mobile,
      address: address,
      city: city,
      status: status,
      serviceType: serviceType,
      reason: reason,
      followedUpBy: followedUpBy,
      partnerAssigned: partnerAssigned,
    };

    axios
      .patch(url, payload, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          setTimeout(() => {
            // localStorage.setItem("token", response.data.data.token);
            window.location.replace("/bookings");
          }, 1000);
          udpatesuccess('Booking updated successfully !');
        } else {
          updatefailure('Falied to update booking');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="navbar">
        <span className="title">Edit Booking</span>
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
              <label style={{ color: "#666", fontWeight: "700" }}>
                Customer Name
              </label>
              <input
                type="text"
                name=""
                value={customerName}
                className="form-control mt-1"
                placeholder="Partner Name"
                onChange={handleCustomerNameChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Vehicle Type
              </label>
              <input
                type="text"
                name=""
                value={vehicleType}
                className="form-control mt-1"
                placeholder="Vehicle Type"
                onChange={handleVehicleTypeChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Vehicle No
              </label>
              <input
                type="text"
                name=""
                value={vehicleNo}
                className="form-control mt-1"
                placeholder="vehicleNo"
                onChange={handleVehicleNoChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>Phone</label>
              <input
                type="text"
                name=""
                value={mobile}
                className="form-control mt-1"
                placeholder="Phone"
                onChange={handleMobileChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>
                Service Type
              </label>
              <input
                type="text"
                name=""
                value={serviceType}
                className="form-control mt-1"
                placeholder="Service Type"
                onChange={handleServiceTypeChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>Status</label>
              <input
                type="text"
                name=""
                value={status}
                className="form-control mt-1"
                placeholder="Status"
                onChange={handleStatusChange}
                disabled={true}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#666", fontWeight: "700" }}>City</label>
              <input
                type="text"
                name=""
                value={city}
                className="form-control mt-1"
                placeholder="City"
                onChange={handleCityChange}
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
            {openClick && (
              <div className="form-group mt-3">
                <label style={{ color: "#666", fontWeight: "700" }}>
                  Reason
                </label>
                {/* <input
                  type="text"
                  name=""
                  value={reason}
                  className="form-control mt-1"
                  placeholder="Reason"
                  onChange={handleReasonChange}
                /> */}
                {/* <div className="form-control mt-1"> */}
                  
                  {/* <Scrollbar > */}
                  <DropDown />
                {/* </div> */}
              </div>
            )}
            {openClick && (
              <div className="form-group mt-3">
                <label style={{ color: "#666", fontWeight: "700" }}>
                  Followup By
                </label>
                <input
                  type="text"
                  name=""
                  value={followedUpBy}
                  className="form-control mt-1"
                  placeholder="Follow up"
                  onChange={handleFollowedUpByChange}
                />
              </div>
            )}
            {partnerShow && (
              <div className="form-group mt-3">
                <label style={{ color: "#666", fontWeight: "700" }}>
                  Assign Partner
                </label>
                <input
                  type="text"
                  name=""
                  value={partnerAssigned}
                  className="form-control mt-1"
                  placeholder="Assign Partner"
                  onChange={handlePartnerAssignedChange}
                />
              </div>
            )}
          </div>
          <div className="btn  btn-form d-flex justify-content-evenly">
            <NavLink
              className="btn btn-warning"
              onClick={handlePushGoaxled}
              to="#"
            >
              GoAxled
            </NavLink>
            {/* <Modal show={modalShow} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title> Status updated to Goaxled</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TiTick style={{color:"green", fontWeight:"800", fontSize:"2rem"}}></TiTick>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal> */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Update
            </button>
            <NavLink className="btn btn-light" to="/bookings">
              Back
            </NavLink>
            <NavLink
              className="btn btn-danger"
              onClick={handleNotConnected}
              to="#"
            >
              Override
            </NavLink>
            {/* <Modal show={modalShow} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title> Status updated to Override</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TiTick style={{color:"red", fontWeight:"800" ,fontSize:"2rem"}}></TiTick>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal> */}
          </div>
        </div>
      </form>
    </>
  );
};
