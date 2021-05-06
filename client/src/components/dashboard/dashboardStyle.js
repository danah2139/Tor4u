import { Link } from "react-router-dom";
import styled from "styled-components";
export const StyledLink = styled(Link)`
  color: white;
  font-size: 1.2em;
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
export const StyledContainer = styled.div`
  display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledImg = styled.img``;

export const StyledContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #183153;
  align-items: center;
  height: 100%;
  width: 20%;
`;

export const StyledText = styled.h2`
  color: white;
  padding: 10px;
  margin: 10px 0;
`;
