import React from "react";
import { StyledInput, StyledLabel, StyledContainer } from "./utilsStyle";

const Input = ({
  label,
  name,
  onChange,
  value,
  required,
  type = "text",
  autoFocus,
}) => {
  return (
    <StyledContainer>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        autoFocus={autoFocus}
        required={required}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
      />
    </StyledContainer>
  );
};
export default Input;
