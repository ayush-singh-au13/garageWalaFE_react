import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoggedInToken } from "./../utils/tokenValidity";
import ReactPaginate from "react-paginate";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { ToastContainer, toast } from "react-toastify";

export const Model = () => {
  const [data, setData] = useState([]);
  const [limit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const url = `http://localhost:5000/api/v1/bookings/vehicleTypes?limit=${limit}&page=${pageNumber}&search=${search}`;
  useEffect(() => {
    LoggedInToken();
    getResponse();
  }, [pageNumber, search, isDeleted]);

  const addsuccess = (message) => toast.success(message, { autoClose: 1000 });
  const addfailure = (message) => toast.error(message, { autoClose: 1000 });

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
    window.location.replace("/editVehicleType?id=" + id);
  };

  const handleDelete = (event, id) => {
    event.preventDefault();
    setIsDeleted(false);
    window.confirm("Are you sure you want to delete?");
    axios
      .delete(
        `http://localhost:5000/api/v1/bookings/deleteVehicleType?id=${id}`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log(data);
        if (response.data.status === 200) {
          addsuccess("Model deleted successfully");
          setIsDeleted(true);
        } else {
          addfailure("Failed to delete model");
          setIsDeleted(true);
        }
      })
      .catch((error) => console.log(error));
  };

  if (data.length >= 0) {
    return (
      <div>
        <>
          <div className="navbar">
            <span className="title">Modal</span>
            <Link className="home" to="/dashboard">
              Home
            </Link>
          </div>
          <ToastContainer />
          <NavLink type="submit" className="btn addModal" to="addModal">
            Add Modal
          </NavLink>
          <div>
            <div className="modalSection">All Modals</div>
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
                <th scope="col">Vehicle Type</th>
                <th scope="col">Credits</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((e, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{e.name}</td>
                      <td>{e.credit}</td>
                      <td>
                        <Tooltip placement="left-start" title="Edit" arrow>
                          <Link onClick={(event) => handleEdit(event, e._id)}>
                            <AiOutlineEdit className="edit" />
                          </Link>
                        </Tooltip>
                        <Tooltip placement="bottom" title="Delete" arrow>
                          <Link onClick={(event) => handleDelete(event, e._id)}>
                            <AiFillDelete className="delete" />
                          </Link>
                        </Tooltip>
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
