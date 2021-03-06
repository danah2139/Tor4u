import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import LandingPage from "../../pages/landingPage/LandingPage";
import LoginPage from "../../pages/loginPage/LoginPage";

import { isUserLoggedIn } from "../../apis/usersApi";
import ProvidersList from "../providersList/ProvidersList";
import Dashboard from "../../pages/dashboard/Dashboard";
import Calendar from "../calendar/Calendar";
import UpdateProfileCard from "../updateProfileCard/UpdateProfileCard";

const Main = () => {
  //const [userType, setUserType] = useState("Provider");
  return (
    <main>
      {/* {isUserLoggedIn() ? <Redirect push exact to={`/dashboard`} /> : null} */}
      <Route exact path="/" render={(props) => <LandingPage {...props} />} />
      <Route exact path="/login" render={(props) => <LoginPage {...props} />} />

      <Route
        exact
        path="/profile"
        render={(props) => <UpdateProfileCard {...props} />}
      />
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/providersList" component={ProvidersList} />
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/calendar/:id" component={Calendar} />
    </main>
  );
};
export default Main;
