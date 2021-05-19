import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 100%;
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 1px grey;
  padding: 10px;
  background-color: ${({ theme }) => theme.white};
  font-size: 1.2em;
  align-items: center;
  width: 50%;
  height: 95%;
  .title {
    font-weight: 700;
  }
  img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
  }
`;
