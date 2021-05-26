import styled from "styled-components";
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 10px 15px;
  background: white;
  border-radius: 15px;
  h3 {
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
  }
`;
export const StyledError = styled.div`
  color: white;
  border: 2px solid ${({ theme }) => theme.red};
  border-radius: 3px;
  padding: 3px;
  width: 10em;
  background: ${({ theme }) => theme.red};
`;

export const StyledButton = styled.button``;
