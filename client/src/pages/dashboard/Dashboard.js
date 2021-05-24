import React from "react";
import {
  StyledContainer,
  StyledImg,
  StyledContainerColumn,
} from "./dashboardStyle";
import AppointmentsTable from "../../components/appointmentsTable/AppointmentsTable";
import ProfileCard from "../../components/profileCard/ProfileCard";

const Dashboard = () => {
  return (
    <StyledContainer className="main-container">
      <ProfileCard />
      <StyledContainerColumn>
        <AppointmentsTable />
        <StyledImg src="./dashboard.png" alt="dashboard" />
      </StyledContainerColumn>
    </StyledContainer>
  );
};
export default Dashboard;
