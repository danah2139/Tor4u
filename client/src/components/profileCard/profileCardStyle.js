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
  border-radius: 15px;
  justify-content: space-between;
  box-shadow: 0 0 1px grey;
  padding: 10px;
  background-color: ${({ theme }) => theme.white};
  font-size: 1.2em;
  align-items: center;
  width: 50%;
  height: 100%;
  .title {
    font-weight: 700;
  }
  img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;
