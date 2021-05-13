import styled from "styled-components";
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  align-items: center;
  padding: 10px 15px;
  // background: white;
  border-radius: 15px;
  max-height: 12rem;
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
