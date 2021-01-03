import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import "./userslist.css";

const Petslist = () => {
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [listUsers, setLisetUsers] = useState([]);
  const { getUsers } = useAuth();

  const users = async () => {
    const obj = await getUsers();
    if (obj) setLisetUsers(obj);
  };

  useEffect(() => {
    users();
  }, []);

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
          more Info
        </NavLink>
      ),
    },
  ];

  return (
    <DataTable
      className="my-table"
      title="Users List"
      columns={columns}
      data={listUsers}
      //   progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={listUsers.length}
      //   onChangeRowsPerPage={handlePerRowsChange}
      //   onChangePage={handlePageChange}
    />
  );
};

export default Petslist;
