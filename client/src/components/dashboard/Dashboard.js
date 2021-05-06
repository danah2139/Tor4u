import React, { useEffect, useState } from "react";
import {
  StyledContainer,
  StyledLink,
  StyledText,
  StyledContainerColumn,
  StyledImg,
} from "./dashboardStyle";
import { getUserType } from "../../apis/auth";
import { isUserLoggedIn, getUser } from "../../apis/usersApi";
import Logout from "../logout/Logout";
import ProfileCard from "../profileCard/ProfileCard";

const Dashboard = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    getUserName();
    setUserType(getUserType());
  }, []);

  const getUserName = async () => {
    if (isUserLoggedIn()) {
      const userType = await getUserType();
      if (userType === "provider") {
        const provider = await getUser(userType);
        // console.log(provider);
        setUsername(provider.companyName);
      } else {
        const receiver = await getUser(userType);
        setUsername(receiver.name);
      }
    }
  };

  return (
    <StyledContainer>
      <StyledContainerColumn>
        <StyledText>Logged in as {username}</StyledText>
        <StyledLink to="/profile">Update Profile</StyledLink>
        {userType === "provider" ? (
          <StyledLink to="/addServiceToCalender">
            Add Service To Calender
          </StyledLink>
        ) : (
          <StyledLink to="/ProvidersList">Schedule Service </StyledLink>
        )}
        <Logout />
      </StyledContainerColumn>
      <ProfileCard />

      {/* <StyledImg /> */}
    </StyledContainer>
  );
};
export default Dashboard;
