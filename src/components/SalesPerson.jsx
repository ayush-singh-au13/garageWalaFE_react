import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoggedInToken } from "./../utils/tokenValidity";
import ReactPaginate from "react-paginate";
import { AiOutlineEdit } from "react-icons/ai";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { GiConsoleController } from "react-icons/gi";
import Tooltip from "@mui/material/Tooltip";

export const SalesPerson = () => {
  const [data, setData] = useState([]);
  const [limit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);

  const url = `http://localhost:5000/api/v1/user/usersList?role=SALESMAN&limit=${limit}&page=${pageNumber}&search=${search}&active=${active}`;
  useEffect(() => {
    LoggedInToken();
    getResponse();
  }, [pageNumber, search, active]);

  const getResponse = async () => {
    await axios
      .get(url, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setData(response.data.data.users);
          setPageCount(response.data.data.pageMeta.page);
        }
      })
      .catch((err) => console.log(err));
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    console.log(selectedPage);
    setPageNumber(selectedPage + 1);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleEdit = (event, id) => {
    event.preventDefault();
    // console.log("==================================>",id);
    window.location.replace(`/editSalesPerson?id=${id}`);
  };

  const handleDelete = async (event, id) => {
    event.preventDefault();
    await axios
      .patch(
        `http://localhost:5000/api/v1/user/salesPersonStatusUpdate?id=${id}`
      )
      .then((response) => {
        if (response.data.status === 200) {
          // window.location.reload(false);
        }
      })
      .catch((error) => console.log(error));
  };

  if (data.length >= 0) {
    return (
      <div>
        <>
          <div className="navbar">
            <span className="title">Sales Person</span>
            <NavLink className="home" to="/dashboard">
              Home
            </NavLink>
          </div>
          <NavLink type="submit" className="btn addModal" to="addSalesPerson">
            Add Salesman
          </NavLink>

          <div>
            <div className="modalSection">SalesTeam List</div>
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
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Gender</th>
                <th scope="col">Status</th>
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
                      <td>{e.email}</td>
                      <td>{e.mobile}</td>
                      <td>{e.gender}</td>
                      <td>{e.status === true ? "Active" : "Inactive"}</td>
                      <td>
                        <Tooltip placement="left-start" title="Edit" arrow>
                          <Link
                            onClick={(event) => {
                              console.log(e._id);
                              handleEdit(event, e._id);
                            }}
                          >
                            <AiOutlineEdit className="edit" />
                          </Link>
                        </Tooltip>
                        {e.status !== true ? (
                          <Tooltip placement="bottom" title="Update" arrow>
                            <Link
                              onClick={(event) => {
                                setActive(!active);
                                handleDelete(event, e._id);
                              }}
                            >
                              <BsToggleOff className="update-inactive" />
                            </Link>
                          </Tooltip>
                        ) : (
                          <Tooltip placement="bottom" title="Update" arrow>
                            <Link
                              onClick={(event) => {
                                setActive(!active);
                                handleDelete(event, e._id);
                              }}
                            >
                              <BsToggleOn className="update-active" />
                            </Link>
                          </Tooltip>
                        )}
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
