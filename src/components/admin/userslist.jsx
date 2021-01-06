import React, { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import "./userslist.css";

const override = css`
  position: absolute;
  top: 14.5%;
  left: 50%;
  border-color: red;
`;
const Petslist = () => {
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [listUsers, setLisetUsers] = useState([]);
  const { getUsers } = useAuth();

  const users = async (page) => {
    setLoading(true);
    const obj = await getUsers(page, perPage);
    if (obj) {
      setLisetUsers(obj.result);
      setTotalRows(obj.data.length);
    }
    setLoading(false);
  };

  useEffect(() => {
    users(1);
  }, []);

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const obj = await getUsers(page, newPerPage);
    setLisetUsers(obj.result);
    setPerPage(newPerPage);
    setLoading(false);
  };
  const handlePageChange = async (page) => {
    setLoading(true);
    const obj = await getUsers(page, perPage, {});
    setLisetUsers(obj.result);
    setLoading(false);
  };

  const columns = [
    {
      name: "First Name",
      selector: "first_name",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "last_name",
      sortable: true,
    },
    {
      ignoreRowClick: true,
      cell: (row) => (
        <NavLink className="more-info" exact to={`/userinfo/${row._id}`}>
          <i className="fa fa-angle-double-right fa-2x"></i>
        </NavLink>
      ),
    },
  ];

  return (
    <>
      <DataTable
        className="my-table"
        title="Users List"
        columns={columns}
        data={listUsers}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
      <BounceLoader
        css={override}
        size={60}
        color={"#123abc"}
        loading={loading}
      />
    </>
  );
};

export default Petslist;
