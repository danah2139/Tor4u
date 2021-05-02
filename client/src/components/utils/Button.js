import React from "react";
import { StyledButton } from "./utilsStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Button = ({ label, onClick, type = "button", value }) => {
  return (
    <StyledButton type={type} onClick={onClick} value={value}>
      {label.toUpperCase()}
      {value === "SIGN IN" ? (
        <FontAwesomeIcon icon={faSignInAlt} size="1x" />
      ) : value === "SIGN UP" ? (
        <FontAwesomeIcon icon={faUserPlus} size="1x" />
      ) : null}
    </StyledButton>
  );
};

export default Button;
