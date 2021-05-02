import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import LandingPage from "../landingPage/LandingPage";
import LoginPage from "../loginPage/LoginPage";
// import { isUserLoggedIn } from "../../apis/usersApi";

const Main = () => {
  const [userType, setUserType] = useState("Provider");
  return (
    <main>
      {/* {isUserLoggedIn() ? (
        <Redirect push exact to={`/${userType}/dashboard`} />
      ) : null} */}
      <Route
        exact
        path="/"
        render={(props) => <LandingPage {...props} setUserType={setUserType} />}
      />
      <Route
        exact
        path="/login"
        render={(props) => (
          <LoginPage {...props} userType={userType} setUserType={setUserType} />
        )}
      />
    </main>
  );
};
export default Main;
