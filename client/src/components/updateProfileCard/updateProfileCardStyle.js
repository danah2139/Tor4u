import styled from "styled-components";
export const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.lightGray};
  background: #f0f2f5;
  height: 100%;
`;
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;
  padding: 1em 5em;
  background: ${({ theme }) => theme.lightGray};
  // border-radius: 15px;
  justify-content: space-between;

  h3 {
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
  }
  [type="file"] {
    display: none;
    margin-bottem: 5px;
    padding: 5px;
  }
`;
