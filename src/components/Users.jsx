import React, { useEffect, useState } from "react";
import axios from "axios";
import { LoggedInToken } from "./../utils/tokenValidity";
import ReactPaginate from "react-paginate";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";

export const Users = () => {
  const [data, setData] = useState([]);
  const [limit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");

  const url = `http://localhost:5000/api/v1/user/usersList?limit=${limit}&page={pageNumber}&search=${search}`;
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
          setData(response.data.data.users);
          setPageCount(response.data.data.pageMeta.page);
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

  const handleEdit = (event) => {};

  const handleDelete = (event) => {};

  if (data.length >= 0) {
    return (
      <div>
        <>
          <div className="navbar">
            <span className="title">Users</span>
          </div>
          <div>
            <div className="modalSection">All Users</div>
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
                          <NavLink onClick={handleEdit}>
                            <AiOutlineEdit className="edit" />
                          </NavLink>
                        </Tooltip>
                        <Tooltip placement="bottom" title="Delete" arrow>
                          <NavLink onClick={handleDelete}>
                            <AiFillDelete className="delete" />
                          </NavLink>
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
