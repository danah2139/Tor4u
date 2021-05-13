import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";

export const StyledContainer = styled.div`
  background: ${({ theme }) => theme.lightGray};
  color: ${({ theme }) => theme.DarkBlue};
  .fc-daygrid-event {
    white-space: pre-wrap;
  }
`;
