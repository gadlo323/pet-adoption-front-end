import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AutoProvider } from "./conteaxts/AutoConteaxt";
import Welcoming from "./components/homepage/welcoming";
import Serach from "./components/globel/search";
import "./App.css";
import Dashborad from "./components/loggedIn/dashborad";
import ProfileSettings from "./components/loggedIn/profilesettings";
import Mypets from "./components/loggedIn/mypets";
import Petpage from "./components/loggedIn/petpage";
import PrivateRoute from "./components/PrivateRoute";
import Addpet from "./components/admin/addPet";
import Admindashborad from "./components/admin/admindasborad";

function App() {
  return (
    <Router>
      <AutoProvider>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Welcoming} />
            <Route exact path="/search" component={Serach} />
            <PrivateRoute exact path="/deshborad" component={Dashborad} />
            <PrivateRoute
              exact
              path="/ProfileSettings"
              component={ProfileSettings}
            />
            <PrivateRoute exact path="/Mypets" component={Mypets} />
            <PrivateRoute exact path="/Petpage" component={Petpage} />
            <PrivateRoute exact path="/admin/addpet" component={Addpet} />
            <PrivateRoute
              exact
              path="/admin/deshborad"
              component={Admindashborad}
            />
          </Switch>
        </div>
      </AutoProvider>
    </Router>
  );
}

export default App;
