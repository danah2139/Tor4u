import styled from "styled-components";

export const StyledContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);

  span {
    font-weight: 700;
  }
  .popup_inner {
    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    bottom: 25%;
    margin: auto;
    background: white;
    z-index: 1000;
    padding: 10px;
    border-radius: 15px;
  }
  .buttons-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledMessage = styled.div`
  color: white;
  border: 2px solid ${({ theme }) => theme.darkBlue};
  border-radius: 3px;
  padding: 3px 10px;
  background: ${({ theme }) => theme.darkBlue};
`;
