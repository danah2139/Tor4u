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

  .popup_inner {
    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    bottom: 25%;
    margin: auto;
    background: white;
    z-index: 1000;
  }
`;
