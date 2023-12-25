import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loggedOutToken } from "./../utils/tokenValidity";
import { Wave } from "react-animated-text"

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    loggedOutToken();
  }, []);

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  // toast message
  const loginsuccess = (message) => toast.success(message, { autoClose: 1500 });
  const loginfailure = (message) => toast.error(message, { autoClose: 1500 });

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = `http://localhost:5000/api/v1/user/login`;
    const payload = {
      email: email,
      password: password,
    };
    axios
      .post(url, payload)
      .then((response) => {
        console.log(response);

        if (response.data.status === "OK") {
          setTimeout(() => {
            localStorage.setItem("token", response.data.data.token);
            window.location.replace("/dashboard");
          }, 1000);
          loginsuccess(response.data.message);
        } else {
          loginfailure(response.data.message);
        }
      })
      .catch((err) => {console.error(err)
        });
  };

  return (
    <>
      <ToastContainer />
      <div className="Auth-form-container homepage">
        <h2 className="Auth-form-title-2"><Wave text="WELCOME TO GARAGEWALA" /></h2>;
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label style={{color:'white'}}>Email address</label>
              <input
                autoFocus
                type="email"
                value={email}
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={handleEmailChange}
                name="email"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label style={{color:'white'}}>Password</label>
              <input
                type="password"
                value={password}
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handlePasswordChange}
                name="password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!validateForm()}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
