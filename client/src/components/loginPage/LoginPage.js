import React from "react";
import { StyledLink, StyledContainer } from "./loginPageStyle";
import SignInForm from "../signInForm/SignInForm";
import ProviderSignUpForm from "../signUpForm/ProviderSignUpForm";
import ReceiverSignUpForm from "../signUpForm/ReceiverSignUpForm";

const LoginPage = (props) => {
  const userType = props.userType;
  const otherUserType = userType === "Provider" ? "Receiver" : "Provider";
  return (
    <div>
      <h1>Log in as a {userType}</h1>
      <p>
        or change to{" "}
        <StyledLink
          to="/login"
          onClick={() => props.setUserType(otherUserType)}
        >
          {otherUserType}
        </StyledLink>
      </p>
      <StyledContainer>
        <SignInForm userType={userType} />
        {userType === "Provider" ? (
          <ProviderSignUpForm userType={userType} />
        ) : (
          <ReceiverSignUpForm userType={userType} />
        )}
      </StyledContainer>
    </div>
  );
};
export default LoginPage;
