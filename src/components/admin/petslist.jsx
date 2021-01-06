import React, { useState, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import DataTable from "react-data-table-component";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../conteaxts/AutoConteaxt";

import "./petslist.css";
const override = css`
  position: absolute;
  top: 65%;
  left: 50%;
  border-color: red;
`;
const Petslist = () => {
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [listPets, setLisetPets] = useState([]);
  const { serach } = useAuth();

  const pets = async (page) => {
    setLoading(true);
    const obj = await serach(page, perPage, {});
    const { result, data } = obj.dataSevere;
    setLisetPets(result);
    setTotalRows(data.length);
    setLoading(false);
  };

  useEffect(() => {
    pets(1);
  }, []);

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const obj = await serach(page, newPerPage, {});
    const { result } = obj.dataSevere;
    setLisetPets(result);
    setPerPage(newPerPage);
    setLoading(false);
  };
  const handlePageChange = async (page) => {
    setLoading(true);
    const obj = await serach(page, perPage, {});
    const { result } = obj.dataSevere;
    setLisetPets(result);
    setLoading(false);
  };
  const conditionalRowStyles = [
    {
      when: (row) => row.status === "Adopted",
      style: {
        background: "#E16C6C",
        "&:hover": {
          cursor: "not-allowed",
        },
      },
    },
    {
      when: (row) => row.status === "Fostered",
      style: {
        background: "#F2BC57",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "Available",
      style: {
        backgroundImage: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

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
      cell: (row) => <img className="pet-img-admin" src={row.image_url} />,
    },
    {
      ignoreRowClick: true,
      cell: (row) => (
        <NavLink
          className="more-info"
          exact
          to={`/admin/addpet/?id=${row._id}`}
        >
          <i className="fa fa-edit"></i>
        </NavLink>
      ),
    },
  ];

  return (
    <>
      <DataTable
        className="my-table"
        title="pets List"
        columns={columns}
        data={listPets}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        conditionalRowStyles={conditionalRowStyles}
      />
      <BounceLoader
        css={override}
        size={90}
        color={"#123abc"}
        loading={loading}
      />
    </>
  );
};

export default Petslist;
