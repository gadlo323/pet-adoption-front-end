import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../conteaxts/AutoConteaxt";

import "./petslist.css";
const Petslist = () => {
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [listPets, setLisetPets] = useState([]);
  const { Pets } = useAuth();

  const pets = async (page) => {
    const obj = await Pets(page, perPage);
    setLisetPets(obj.result);
    setTotalRows(obj.data.length);
  };

  useEffect(() => {
    pets(1);
  }, []);

  const handlePerRowsChange = async (newPerPage, page) => {
    const obj = await Pets(page, newPerPage);
    setLisetPets(obj.result);
    setPerPage(newPerPage);
  };
  const handlePageChange = async (page) => {
    const obj = await Pets(page, perPage);
    setLisetPets(obj.result);
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      selector: "image_url",
      cell: (row) => <img className="pet-img" src={row.image_url} />,
    },
    {
      ignoreRowClick: true,
      cell: (row) => (
        <NavLink className="more-info" exact to={`/admin/addpet/${row._id}`}>
          edit
        </NavLink>
      ),
    },
  ];

  return (
    <DataTable
      className="my-table"
      title="pets List"
      columns={columns}
      data={listPets}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  );
};

export default Petslist;
