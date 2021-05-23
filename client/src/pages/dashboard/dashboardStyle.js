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
export const StyledText = styled.h2`
  color: white;
  padding: 10px;
  margin: 10px 0;
`;

export const StyledContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.lightGray};

  // flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    // flex-wrap: wrap;
  }
`;

export const StyledImg = styled.img``;

export const StyledContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  justify-content: space-between;
  background-color: rgba(24, 49, 83, 0.9);
  align-items: center;
  height: 98.7%;
  width: 20%;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;
