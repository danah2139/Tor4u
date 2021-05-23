import React from "react";
import { StyledButton } from "./utilsStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Button = ({
  label,
  onClick,
  type = "button",
  value,
  color = "rgba(255, 255, 255, 0.90)",
  background = "#139CF7",
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      value={value}
      theme={{ darkBlue: background, white: color }}
    >
      {label.toUpperCase()}
      {value === "SIGN IN" ? (
        <FontAwesomeIcon icon={faSignInAlt} size="1x" />
      ) : value === "SIGN UP" ? (
        <FontAwesomeIcon icon={faUserPlus} size="1x" />
      ) : value === "LOG OUT" ? (
        <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
      ) : null}
    </StyledButton>
  );
};

export default Button;
