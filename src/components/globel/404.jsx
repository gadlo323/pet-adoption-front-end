import { React } from "react";
import Navhome from "../homepage/navhome";
import NavLogged from "../loggedIn/navLogged";
import { useAuth } from "../../conteaxts/AutoConteaxt";
import "./404.css";

const PageNotFound = () => {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? <NavLogged /> : <Navhome />}
      <section className="not-found-404">
        <img src="./not-found.png" alt="404" />
      </section>
    </>
  );
};

export default PageNotFound;
