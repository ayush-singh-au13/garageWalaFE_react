import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { LoggedInToken } from "./../utils/tokenValidity";
import { FaUserSecret, FaUserFriends } from "react-icons/fa";
import { GrNotes, GrStackOverflow } from "react-icons/gr";
import { GiMechanicGarage } from "react-icons/gi";
import { MdMiscellaneousServices } from "react-icons/md";
import axios from "axios";

export const Dashboard = () => {
  let [data, setData] = useState([]);
  let url = "http://localhost:5000/api/v1/dashboard/dashboardDetails";

  useEffect(() => {
    getResponse();
    LoggedInToken();
  },[]);
  
 

  const getResponse = async () => {
    await axios
      .get(url, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setData(response.data.data);
        }
      })
      .catch((err) => console.log("=======>", err));
  };

  if (data.length > 0) {
    return (
    
        <div>
          <div className="center">
            <div className="navbar">
              <span className="title"><h2>Dashboard</h2></span>
            </div>
            {data.map((e, index) => {
              console.log(e);
              return (
                <div className="card" key={index}>
                  <div className="dashCard">
                    <Card
                      style={{
                        width: "32rem",
                        height: "8rem",
                        background: "#F1A1E4",
                        boxShadow: "10px 10px 5px #D7DBDD",
                      }}
                    >
                      <Card.Body>
                        <Link to="/users" className="link">
                          <div>
                            <Card.Title>Users</Card.Title>
                            <FaUserSecret className="icons" />
                          </div>
                          <span className="icons2">{e.userCount}</span>
                        </Link>

                        <Card.Text></Card.Text>
                      </Card.Body>
                    </Card>
                  </div>

                  <div className="dashCard">
                    <Card
                      style={{
                        width: "32rem",
                        height: "8rem",
                        background: "#F5F2A3",
                        boxShadow: "10px 10px 5px #D7DBDD",
                      }}
                    >
                      <Card.Body>
                        <Link to="/bookings" className="link">
                          <Card.Title>Bookings</Card.Title>
                          <GrNotes className="icons notes" />
                          <span className="icons2">{e.bookingsCount}</span>
                          <Card.Text></Card.Text>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="dashCard">
                    <Card
                      style={{
                        width: "32rem",
                        height: "8rem",
                        background: "#BAF6F8",
                        boxShadow: "10px 10px 5px #D7DBDD",
                      }}
                    >
                      <Card.Body>
                        <Link to="/override" className="link">
                          <Card.Title>Override</Card.Title>
                          <GrStackOverflow className="icons" />
                          <span className="icons2">{e.overrideCount}</span>
                          <Card.Text></Card.Text>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="dashCard">
                    <Card
                      style={{
                        width: "32rem",
                        height: "8rem",
                        background: "#F8C0C3",
                        boxShadow: "10px 10px 5px #D7DBDD",
                      }}
                    >
                      <Card.Body>
                        <Link to="/goaxled" className="link">
                          <Card.Title>GoAxled</Card.Title>
                          <GiMechanicGarage className="icons" />
                          <span className="icons2">{e.goaxledCount}</span>
                          <Card.Text></Card.Text>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="dashCard">
                    <Card
                      style={{
                        width: "32rem",
                        height: "8rem",
                        background: "#ABEBC6",
                        boxShadow: "10px 10px 5px #D7DBDD",
                      }}
                    >
                      <Card.Body>
                        <Link to="/services" className="link">
                          <Card.Title>Services</Card.Title>
                          <MdMiscellaneousServices className="icons" />
                          <span className="icons2">
                            {e.servicesCount ? e.servicesCount : 0}
                          </span>
                          <Card.Text></Card.Text>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="dashCard">
                    <Card
                      style={{
                        width: "32rem",
                        height: "8rem",
                        background: "#FAD7A0",
                        boxShadow: "10px 10px 5px #D7DBDD",
                      }}
                    >
                      <Card.Body>
                        <Link to="/salesperson" className="link">
                          <Card.Title>Sales Person</Card.Title>
                          <FaUserFriends className="icons" />
                          <span className="icons2">{e.salespersonCount}</span>
                          <Card.Text></Card.Text>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="dashCard">
                  </div>
                </div>
              );
            })}
          </div>
        </div>

    );
  }
};
