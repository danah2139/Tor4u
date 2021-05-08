import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledWarning = styled.div`
  color: white;
  border: 2px solid ${({ theme }) => theme.darkBlue};
  border-radius: 3px;
  padding: 3px 10px;
  background: ${({ theme }) => theme.lightBlue};
`;

export const StyledContainerColumn = styled.div`
  border: 2px solid ${({ theme }) => theme.darkBlue};
  width: 700px;
  padding: 10px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
  & h3 {
    padding: 6px 10px;
    border-bottom: 2px solid ${({ theme }) => theme.darkBlue};
  }
  & li {
    padding: 3px 10px;
    border-bottom: 2px solid ${({ theme }) => theme.darkBlue};
    list-style: none;
  }
  & li:hover {
    background: ${({ theme }) => theme.lightBlue};
    cursor: pointer;
  }
`;
export const StyledHeader = styled.h3``;
export const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  &:hover {
    color: ${({ theme }) => theme.darkBlue};
  }
`;
