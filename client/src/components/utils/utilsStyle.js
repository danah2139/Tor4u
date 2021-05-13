import styled from "styled-components";

export const StyledInput = styled.input`
  margin-bottom: 7px;
`;
export const StyledLabel = styled.label`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const StyledSelect = styled.select`
  overflow: scroll;
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
  max-width: 120px;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  padding: 0.6em 0.5em;
  border: 2px solid ${({ theme }) => theme.darkBlue};
  border-radius: 5px;
  svg {
    margin-left: 5px;
  }
  &:hover {
    background: ${({ theme }) => theme.lightBlue};
    border: 2px solid ${({ theme }) => theme.lightBlue};
    cursor: pointer;
  }
`;
