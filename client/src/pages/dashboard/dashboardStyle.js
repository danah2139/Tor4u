import styled from "styled-components";
export const StyledText = styled.h2`
  color: white;
  padding: 10px;
  margin: 10px 0;
`;

export const StyledContainer = styled.div`
  display: flex;
  background: ${({ theme }) => theme.lightGray};
  align-items: center;
  & .main-container {
    height: 100%;
    border: 5px solid black;
  }
  & .flex-column {
    flex-direction: column;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    // flex-wrap: wrap;
  }
`;

export const StyledImg = styled.img`
  display: block;
  height: 40%;
`;

export const StyledContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  justify-content: space-between;
  background-color: rgba(24, 49, 83, 0.9);
  align-items: center;
  height: 100%;
  // width: 20%;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;
