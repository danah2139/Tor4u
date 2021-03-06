import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { StyledContainer, StyledWrapper } from "./landingPageStyle";
import Button from "../../components/utils/Button";
import { setUserType } from "../../apis/auth";
//import { testConnection } from "../../apis/usersApi";

const LandingPage = (props) => {
  const history = useHistory();

  const routeChange = (e) => {
    setUserType(e.target.value.toLowerCase());
    history.push("/login");
  };

  useEffect(() => {
    // testConnection();
  }, []);

  return (
    <StyledWrapper>
      <StyledContainer className="flex-column main">
        <h1>Welcome To Tor4U</h1>
        <p>Application for scheduling services</p>
        <p>What do you want to do?</p>
        <StyledContainer>
          <Button label="Get Service" value="Receiver" onClick={routeChange} />
          <Button
            label="Provide Service"
            value="Provider"
            onClick={routeChange}
          />
        </StyledContainer>
      </StyledContainer>
      <img src="./landing-page.png" alt="img" />
    </StyledWrapper>
  );
};
export default LandingPage;
