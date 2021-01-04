import React from "react";
import PrartiClas from "../globel/Particles";
import NavLogged from "../loggedIn/navLogged";
import { NavLink } from "react-router-dom";
import Userslist from "./userslist.jsx";
import Petslist from "./petslist";
import "./admindashborad.css";

const Admindashborad = () => {
  return (
    <>
      <NavLogged />
      <section className="admin-deshborad">
        <div className="cool">
          <PrartiClas colorPic={"#D459B7"} />
        </div>
        <NavLink className="add-pet-link" exact to="/admin/addpet/">
          Add Pet
        </NavLink>
        <div className="users-lists">
          <Userslist />
        </div>
        <div className="pets-list">
          <Petslist />
        </div>
      </section>
    </>
  );
};

export default Admindashborad;
