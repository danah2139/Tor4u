import React from "react";
import { StyledContainer, StyledImg } from "./dashboardStyle";
import AppointmentsTable from "../../components/appointmentsTable/AppointmentsTable";
import ProfileCard from "../../components/profileCard/ProfileCard";

const Dashboard = () => {
  return (
    <StyledContainer className="main-container">
      <ProfileCard />
      <StyledContainer className="flex-column ">
        <AppointmentsTable />
        <StyledImg src="./dashboard.png" alt="dashboard" />
      </StyledContainer>
    </StyledContainer>
  );
};
export default Dashboard;
