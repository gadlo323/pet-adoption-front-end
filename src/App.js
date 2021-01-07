import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AutoProvider } from "./conteaxts/AutoConteaxt";
import Welcoming from "./components/homepage/welcoming";
import Serach from "./components/globel/search";
import "./App.css";
import Dashborad from "./components/loggedIn/dashborad";
import ProfileSettings from "./components/loggedIn/profilesettings";
import UserPets from "./components/loggedIn/userPets";
import Petpage from "./components/loggedIn/petpage";
import UserInfo from "./components/admin/userInfo";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/publicRoute";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import Addpet from "./components/admin/addPet";
import Admindashborad from "./components/admin/admindasborad";

function App() {
  return (
    <Router>
      <AutoProvider>
        <div className="App">
          <Switch>
            <PublicRoute exact path="/" component={Welcoming} />
            <Route path="/search" component={Serach} />
            <Route path="/Petpage/:id/:owned?" component={Petpage} />

            <PrivateRoute path="/deshborad" component={Dashborad} />
            <PrivateRoute
              exact
              path="/ProfileSettings"
              component={ProfileSettings}
            />
            <PrivateRoute path="/mypets" component={UserPets} />

            <PrivateRouteAdmin path="/admin/addpet/" component={Addpet} />
            <PrivateRouteAdmin path="/userinfo/:id" component={UserInfo} />
            <PrivateRouteAdmin
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
