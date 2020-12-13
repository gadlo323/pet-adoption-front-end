import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcoming from "./components/homepage/welcoming";
import "./App.css";
import NavLogged from "./components/loggedIn/navLogged";
import LinksCard from "./components/loggedIn/linksCard";
import ProfileSettings from "./components/loggedIn/profilesettings";
import Mypets from "./components/loggedIn/mypets";
import Petpage from "./components/petpage";

function App() {
  return (
    <div className="App">
      <NavLogged />
      <Petpage />
      {/* <Mypets /> */}
      {/* <ProfileSettings /> */}
      {/* <LinksCard /> */}

      {/* <Welcoming /> */}
    </div>
  );
}

export default App;
