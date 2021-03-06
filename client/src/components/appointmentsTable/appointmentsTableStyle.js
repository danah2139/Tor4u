import styled from "styled-components";

export const StyledContainer = styled.div`
  // color: ${({ theme }) => theme.darkBlue};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.white};
  padding: 15px;
  height: 100%;
  width: 100%;

  box-shadow: 0 0 1px grey;
  h2 {
    color: ${({ theme }) => theme.darkBlue};
  }
  table {
    border: transparent;
    height: 80%;
    width: 100%;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    h2 {
      margin: 0;
      font-size: 1.2em;
    }
    table {
      height: 0;
    }
  }
`;
