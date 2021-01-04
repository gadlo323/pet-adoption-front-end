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
import UserInfo from "./components/admin/userInfo";
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
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
            <Route exact path="/Petpage/:id" component={Petpage} />
            <PrivateRoute exact path="/deshborad" component={Dashborad} />
            <PrivateRoute
              exact
              path="/ProfileSettings"
              component={ProfileSettings}
            />
            <PrivateRoute exact path="/mypets" component={Mypets} />

            <PrivateRouteAdmin exact path="/admin/addpet/" component={Addpet} />
            <PrivateRouteAdmin
              exact
              path="/userinfo/:id"
              component={UserInfo}
            />
            <PrivateRouteAdmin
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
