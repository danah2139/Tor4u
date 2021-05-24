import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  justify-content: space-around;
  box-shadow: 0 0 1px grey;
  padding: 10px;
  background-color: ${({ theme }) => theme.white};
  font-size: 1.2em;
  align-items: center;
  min-width: 20em;
  height: 100%;
  .title {
    font-weight: 700;
    color: ${({ theme }) => theme.darkBlue};
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
