import React from "react";
import { StyledButton } from "./utilsStyle";

const Button = ({ label, onClick, type = "button", value }) => {
  return (
    <div>
      <StyledButton type={type} onClick={onClick} value={value}>
        {label.toUpperCase()}
      </StyledButton>
    </div>
  );
};

export default Button;
