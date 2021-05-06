import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import LandingPage from "../landingPage/LandingPage";
import LoginPage from "../loginPage/LoginPage";

import { isUserLoggedIn } from "../../apis/usersApi";
import ProvidersList from "../providersList/ProvidersList";
import ProfileCard from "../profileCard/ProfileCard";
import AddCategory from "../addCategory/AddCategory";
import Dashboard from "../dashboard/Dashboard";

const Main = () => {
  //const [userType, setUserType] = useState("Provider");
  return (
    <main>
      {/* {isUserLoggedIn() ? (
        <Redirect push exact to={`/${userType}/dashboard`} />
      ) : null} */}
      <Route exact path="/" render={(props) => <LandingPage {...props} />} />
      <Route exact path="/login" render={(props) => <LoginPage {...props} />} />

      <Route
        exact
        path="/profile"
        render={(props) => <ProfileCard {...props} />}
      />
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/providersList" component={ProvidersList} />
      <Route exact path="/addServiceToCalender" component={AddCategory} />
    </main>
  );
};
export default Main;
