import React, { useState, useEffect } from "react";
import PrartiClas from "../globel/Particles";
import DataTable from "react-data-table-component";
import Navhome from "../homepage/navhome";
import { NavLink } from "react-router-dom";
import NavLogged from "../loggedIn/navLogged";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import Searchbar from "./searchbar";
import "./search.css";
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
    const obj = await serach(page, newPerPage);
    setLisetPets(obj.result);
    setPerPage(newPerPage);
  };
  const handlePageChange = async (page) => {
    const obj = await serach(page, perPage);
    setLisetPets(obj.result);
  };

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
          Go...
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
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
        {listPets.length === 0 && (
          <img className="not-found" src="./data-notFound.jpg" alt="no-data" />
        )}
      </section>
      ;
    </>
  );
};

export default Serach;
