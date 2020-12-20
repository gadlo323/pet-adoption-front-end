import React, { useState } from "react";
import DataTable from "react-data-table-component";
import data from "./usersListMock.json";
import "./userslist.css";

const Userslist = () => {
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const columns = [
    {
      name: "User Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "First Name",
      selector: "first_name",
      sortable: true,
      right: true,
    },
    {
      name: "Last Name",
      selector: "last_name",
      sortable: true,
      right: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      right: true,
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true,
      right: true,
    },
  ];

  return (
    <DataTable
      title="Users List"
      columns={columns}
      data={data}
      //   progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={data.length}
      //   onChangeRowsPerPage={handlePerRowsChange}
      //   onChangePage={handlePageChange}
    />
  );
};

export default Userslist;
