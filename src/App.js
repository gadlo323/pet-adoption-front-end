import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navhome from "./components/homepage/navhome";
import Welcoming from "./components/homepage/welcoming";
import Footer from "./components/homepage/footer";
import Swiperimg from "./components/homepage/swiperimg";
import "./App.css";
import NavLogged from "./components/loggedIn/navLogged";
import LinksCard from "./components/loggedIn/linksCard";
import ProfileSettings from "./components/loggedIn/profilesettings";
import Mypets from "./components/loggedIn/mypets";

function App() {
  return (
    <div className="App">
      <NavLogged />
      <Mypets />
      {/* <ProfileSettings /> */}
      {/* <LinksCard /> */}
      {/* <Navhome />
      <Welcoming />
      <Swiperimg />
      <Footer /> */}
    </div>
  );
}

export default App;
