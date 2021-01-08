import React, { useState, useEffect } from "react";
import PrartiClas from "../globel/Particles";
import DataTable from "react-data-table-component";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import Navhome from "../homepage/navhome";
import { NavLink } from "react-router-dom";
import NavLogged from "../loggedIn/navLogged";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import Searchbar from "./searchbar";
import "./search.css";

const override = css`
  position: absolute;
  top: 55%;
  left: 50%;
  border-color: red;
`;
const Serach = () => {
  const { currentUser, serach } = useAuth();
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [listPets, setLisetPets] = useState([]);
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   const lastSearch = JSON.parse(localStorage.getItem("search"));
  //   if (lastSearch) setList(lastSearch);
  // }, []);

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const obj = await serach(page, newPerPage);
    const { result } = obj.dataSevere;
    setLisetPets(result);
    setPerPage(newPerPage);
    setLoading(false);
  };
  const handlePageChange = async (page) => {
    setLoading(true);
    const obj = await serach(page, perPage);
    const { result } = obj.dataSevere;
    setLisetPets(result);
    setLoading(false);
  };
  const conditionalRowStyles = [
    {
      when: (row) => row.status === "adopted",
      style: {
        background: "#E16C6C",
        "&:hover": {
          cursor: "not-allowed",
        },
      },
    },
    {
      when: (row) => row.status === "fostered",
      style: {
        background: "#F2BC57",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "available",
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
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      name: "Type",
      selector: "type",
      sortable: true,
    },
    {
      name: "Height(c.m)",
      selector: "height",
      sortable: true,
    },
    {
      name: "Weight(k.g)",
      selector: "weight",
      sortable: true,
    },

    {
      selector: "image_url",
      cell: (row) => <img className="pet-img-admin" src={row.image_url} />,
    },
    {
      ignoreRowClick: true,
      cell: (row) => (
        <NavLink className="more-info" exact to={`/Petpage/${row._id}`}>
          <i className="fa fa-info-circle fa-1x"></i>
        </NavLink>
      ),
    },
  ];

  return (
    <>
      {currentUser ? <NavLogged /> : <Navhome />}
      <section className="search-page">
        <div className="cool">
          <PrartiClas colorPic={"#162B32"} />
        </div>
        <Searchbar
          setList={setLisetPets}
          perPage={perPage}
          setTotalRows={setTotalRows}
        />
        <DataTable
          className="my-table"
          columns={columns}
          data={listPets}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          conditionalRowStyles={conditionalRowStyles}
        />
        {listPets.length === 0 && (
          <img className="not-found" src="./data-notFound.jpg" alt="no-data" />
        )}
        <BounceLoader
          css={override}
          size={90}
          color={"#123abc"}
          loading={loading}
        />
      </section>
      ;
    </>
  );
};

export default Serach;
