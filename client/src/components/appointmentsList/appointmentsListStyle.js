import styled from "styled-components";

export const StyledContainer = styled.div`
  color: ${({ theme }) => theme.darkBlue};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.white};
  padding: 5px;
  box-shadow: 0 0 1px grey;
  height: 100%;
  table {
    border: transparent;
  }
`;
