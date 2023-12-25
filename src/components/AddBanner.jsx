import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoggedInToken } from "../utils/tokenValidity";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const AddBanner = () => {
  const [bannerName, setBannerName] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);

  // toast message
  const addsuccess = (message) => toast.success(message, { autoClose: 1500 });
  const addfailure = (message) => toast.error(message, { autoClose: 1500 });

  useEffect(() => {
    LoggedInToken();
  }, []);
  // const data = new FormData();
  const handleNameChange = (event) => {
    event.preventDefault();
    setBannerName(event.target.value);
  };

  const handleImageChange = (event) => {
    event.preventDefault();
    setBannerImage(event.target.files[0]);
    setBannerUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const formdata = new FormData();
    let url = `http://localhost:5000/api/v1/banner/addBanner`;

    formdata.append("bannerName", bannerName)
    formdata.append("bannerImage", bannerImage)
    axios
      .post(url, formdata,{
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTimeout(() => {
            window.location.replace("/banners");
          }, 2000);
          addsuccess('Banners added successfully');
        } else {
          addfailure(response.data.message);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className="navbar">
        <span className="title">Add Banner</span>
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
                Banner Name*
              </label>
              <input
                autoFocus
                type="text"
                name=""
                value={bannerName}
                className="form-control mt-1"
                placeholder="Banner Name"
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label for="upload" style={{ color: "#666", fontWeight: "700" }}>
                Banner Image*
              </label>
              <input
                type="file"
                id="upload"
                // value={bannerImage}
                accept="image/jgp, image/png, image/gif, image/jpeg"
                className="form-control mt-1"
                onChange={handleImageChange}
              />
              {bannerUrl && <img src={bannerUrl} width={130} height={55}></img>}
            </div>
          </div>
          <div className="btn  btn-form">
            <button
              type="submit"
              value="Submit"
              className="btn btn-primary mr-2"
              // onClick={handleSubmit}
            >
              Submit
            </button>
            <NavLink className="btn btn-light" to="/banners">
              Back
            </NavLink>
          </div>
        </div>
      </form>
    </>
  );
};
