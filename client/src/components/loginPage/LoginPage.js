import React, { useEffect, useState } from "react";
import { StyledLink, StyledContainer } from "./loginPageStyle";
import SignInForm from "../signInForm/SignInForm";
import ProviderSignUpForm from "../signUpForm/ProviderSignUpForm";
import ReceiverSignUpForm from "../signUpForm/ReceiverSignUpForm";
import { getUserType, setUserType } from "../../apis/auth";

const LoginPage = (props) => {
  const [userTypeSelected, setUserTypeSelected] = useState();
  useEffect(() => {
    setUserTypeSelected(getUserType());
  }, []);

  const otherUserType =
    userTypeSelected === "provider" ? "receiver" : "provider";

  const handleClick = async () => {
    setUserTypeSelected(otherUserType);
    await setUserType(userTypeSelected);
  };
  return (
    <div>
      <h1>Log in as a {userTypeSelected}</h1>
      <p>
        or change to{" "}
        <StyledLink onClick={handleClick}>{otherUserType}</StyledLink>
      </p>
      <StyledContainer>
        <SignInForm />
        {userTypeSelected === "provider" ? (
          <ProviderSignUpForm />
        ) : (
          <ReceiverSignUpForm />
        )}
      </StyledContainer>
    </div>
  );
};
export default LoginPage;
