import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.lightGray};
  background: #f0f2f5;
  height: 100%;
`;
export const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f0f2f5;
  padding: 2em;
  flex-wrap: wrap;

  // align-items: center;

  @media (max-width: 576px) {
    flex-direction: column;
    form {
      margin-bottom: 5em;
    }
  }
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
