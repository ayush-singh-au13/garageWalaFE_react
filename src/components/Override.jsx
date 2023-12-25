import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoggedInToken } from "./../utils/tokenValidity";
import ReactPaginate from "react-paginate";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import moment from "moment/moment";

export const Override = () => {
  const [data, setData] = useState([]);
  const [limit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");

  const url =
    `http://localhost:5000/api/v1/bookings/bookingList?limit=${limit}&page=${pageNumber}&search=${search}&status=` +
    "OVERRIDE";
  useEffect(() => {
    LoggedInToken();
    getResponse();
  }, [pageNumber, search]);

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
          setPageCount(response.data.pageMeta.pageSize);
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setPageNumber(selectedPage + 1);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleEdit = (event, id) => {
    event.preventDefault();
    window.location.replace("/editBooking?id=" + id);
  };

  const viewBooking = (event, id) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/api/v1/bookings/viewBooking?id=${id}`)
      .then((response) => {
        if (response.data.status === 200) {
          window.location.reload(false);
        }
      })
      .catch((error) => console.log(error));
  };

  if (data.length >= 0) {
    return (
      <div>
        <>
          <div className="navbar">
            <span className="title">Override List</span>
            <Link className="home" to="/dashboard">
              Home
            </Link>
          </div>
          {/* <NavLink type="submit"className="btn addModal" to='ad'>Add Modal</NavLink> */}
          <div style={{ marginTop: "1.5rem" }}>
            <div className="modalSection">Override List</div>
            <div className="display_text">
              <input
                type="search"
                placeholder="Search"
                onChange={handleChange}
                value={search}
                name="search"
              />
            </div>
          </div>

          <table className="myTable table table-sm table-bordered mt-5 table-hover table-success ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">BookingId</th>
                <th scope="col">Address</th>
                <th scope="col">Service Type</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Contact No.</th>
                <th scope="col">Vehicle</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((e, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{e.bookingId}</td>
                      <td>{e.address}</td>
                      <td>{e.serviceType}</td>
                      <td>{e.customerName}</td>
                      <td>{e.mobile}</td>
                      <td>{e.vehicleType}</td>
                      <td>{moment(e.createdAt).format("DD-MM-YYYY")}</td>

                      <td>
                        <Link onClick={(event) => handleEdit(event, e._id)}>
                          <AiOutlineEdit className="edit" />
                        </Link>
                        <Link onClick={(event) => viewBooking(event, e._id)}>
                          <AiFillDelete className="delete" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <>
                  <tr className="d-flex text-danger font-weight-bold">
                    No matching records found{" "}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeclassname={"active"}
        />
      </div>
    );
  }
};
