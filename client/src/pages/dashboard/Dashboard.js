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
import Logout from "../../components/logout/Logout";
import ProfileCard from "../../components/profileCard/ProfileCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

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
        <StyledLink to="/profile">
          Update Profile <FontAwesomeIcon icon={faUserEdit} size="1x" />
        </StyledLink>
        {userType === "provider" ? (
          <StyledLink to="/calendar">
            Show My Schedule <FontAwesomeIcon icon={faCalendarAlt} size="1x" />
          </StyledLink>
        ) : (
          <StyledLink to="/ProvidersList">
            Schedule Service <FontAwesomeIcon icon={faCalendarAlt} size="1x" />
          </StyledLink>
        )}
        <Logout />
      </StyledContainerColumn>
      <ProfileCard />

      {/* <StyledImg /> */}
    </StyledContainer>
  );
};
export default Dashboard;
