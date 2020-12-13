import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcoming from "./components/homepage/welcoming";
import "./App.css";
import LinksCard from "./components/loggedIn/linksCard";
import ProfileSettings from "./components/loggedIn/profilesettings";
import Mypets from "./components/loggedIn/mypets";
import Petpage from "./components/loggedIn/petpage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Welcoming} />
          <PrivateRoute exact path="/deshborad" component={LinksCard} />
          <PrivateRoute
            exact
            path="/ProfileSettings"
            component={ProfileSettings}
          />
          <PrivateRoute exact path="/Mypets" component={Mypets} />
          <PrivateRoute exact path="/Petpage" component={Petpage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
