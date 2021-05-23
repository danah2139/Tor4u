import styled from "styled-components";

export const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.lightGray};
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  clip-path: polygon(100% 0, 100% 75%, 61% 94%, 0 100%, 0% 0%);
  & img {
    height: 50vh;
    display: block;
  }
  background-color: #f0f2f5;
  @media (max-width: 576px) {
    flex-direction: column;
    overflow: scroll;
    & .main h1 {
      margin: 0;
      font-size: 2rem;
    }
    .main {
      width: 100%;
    }

    img {
      height: 30vh;
    }
  }
`;
export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;

  &.flex-column {
    flex-direction: column;
  }
  & .main-container {
    width: 100%;
    padding: 10px;
  }
  & h1 {
    font-size: 2.7em;
  }
  & p {
    font-size: 1.5em;
    line-height: 0.15;
  }
`;
