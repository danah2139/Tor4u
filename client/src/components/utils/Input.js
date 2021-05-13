import React from "react";
import { StyledInput, StyledLabel, StyledContainer } from "./utilsStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";

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
      <StyledLabel htmlFor={name}>
        {label}{" "}
        {type === "file" && (
          <FontAwesomeIcon
            icon={faFileImage}
            size="3x"
            cursor="pointer"
            color="#183153"
          />
        )}
      </StyledLabel>

      <StyledInput
        id={name}
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
