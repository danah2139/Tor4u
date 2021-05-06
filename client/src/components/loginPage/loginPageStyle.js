import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;
`;

export const StyledLink = styled.button`
  color: ${({ theme }) => theme.darkBlue};
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  padding: 5px;
  border: 1px solid transparent;
  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }
`;
