import styled from "styled-components";

export const StyledInput = styled.input`
  margin-bottom: 7px;
`;
export const StyledLabel = styled.label`
  margin-bottom: 5px;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledButton = styled.button`
  background: ${({ theme }) => theme.darkBlue};
  color: white;
  display: flex;
  font-size: 1em;
  min-width: 120px;
  justify-content: space-between;
  margin-right: 10px;
  padding: 0.6em 0.5em;
  border: 2px solid ${({ theme }) => theme.darkBlue};
  border-radius: 5px;
  &:hover {
    background: ${({ theme }) => theme.lightBlue};
    border: 2px solid ${({ theme }) => theme.lightBlue};
    cursor: pointer;
  }
`;
