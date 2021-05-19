import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.lightGray};
  justify-content: center;
  align-items: center;
  // border-radius: 15px;
  padding: 5px 5px;
  background: #183153;
  box-shadow: 0 0 1px grey;

  & p {
    margin-right: 10px;
    font-weight: 700;
  }
  & a {
    display: block;
    margin-right: 10px;
  }
  & path {
    fill: ${({ theme }) => theme.lightGray};
  }
`;
