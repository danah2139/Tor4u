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
  background-color: ${({ theme }) => theme.white};
  width: 70%;
  margin: 20px;
  display: flex;
  padding: 0 10px;

  flex-direction: column;
  justify-content: space-between;
  // align-items: center;

  text-align: center;
  .title {
    font-weight: 700;
  }
  & h3 {
    padding: 6px 10px;
    border-bottom: 2px solid ${({ theme }) => theme.darkBlue};
  }
  & ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    // width: 100%;
  }
  & li {
    display: block;

    padding: 3px 10px;
    border: 2px solid ${({ theme }) => theme.darkBlue};
    box-shadow: 0 0 1px grey;
    border-radius: 5px;
    display: flex;
    align-items: center;
    list-style: none;
    margin-bottom: 5px;
    width: 100%;
  }
  & img {
    height: 75px;
    width: 75px;
    border-radius: 50%;
  }
  & li:hover {
    color: ${({ theme }) => theme.lightBlue};
    cursor: pointer;
  }
`;
export const StyledHeader = styled.h3``;
export const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  .item {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  &:hover {
    color: ${({ theme }) => theme.darkBlue};
  }
`;
