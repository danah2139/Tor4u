import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledText = styled.p`
  color: white;
  font-size: 1.1rem;
`;

export const StyledContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

export const StyledHeader = styled.header`
  background: white;
  // border-radius: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 10px;
`;

export const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.darkBlue};
  letter-spacing: 0.5rem;
  margin: 0;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.darkBlue};
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  padding: 5px;
  border: 1px solid transparent;
  &:hover {
    // color: ${({ theme }) => theme.lightBlue};
    border: 2px solid;
    border-radius: 3px;
  }
`;
