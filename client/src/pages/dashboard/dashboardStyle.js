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
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 15px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    background: ${({ theme }) => theme.lightGray};
    overflow: auto;
    height: 100%;
  }
`;

export const StyledImg = styled.img`
  display: block;
  height: 40%;
  width: 100%;
`;

export const StyledContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
`;
