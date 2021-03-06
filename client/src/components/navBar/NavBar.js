import React, { useEffect, useState } from "react";
import { bool } from "prop-types";
import { StyledMenu, StyledText, StyledLink } from "./nav.styled";
import { getUserType } from "../../apis/auth";
import { isUserLoggedIn, getUser } from "../../apis/usersApi";
import Logout from "../logout/Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faCalendarAlt,
  faColumns,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ open, setOpen, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    getUserName();
    setUserType(getUserType());
  }, []);

  const getUserName = async () => {
    if (isUserLoggedIn()) {
      const userType = await getUserType();
      if (userType === "provider") {
        const provider = await getUser(userType);
        // console.log(provider);
        setUsername(provider.companyName);
      } else {
        const receiver = await getUser(userType);
        setUsername(receiver.name);
      }
    }
  };

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <StyledText>Logged in as {username}</StyledText>
      <StyledLink to="/profile" onClick={() => setOpen(!open)}>
        Update Profile <FontAwesomeIcon icon={faUserEdit} size="1x" />
      </StyledLink>
      {userType === "provider" ? (
        <StyledLink to="/calendar" onClick={() => setOpen(!open)}>
          Show My Schedule <FontAwesomeIcon icon={faCalendarAlt} size="1x" />
        </StyledLink>
      ) : (
        <StyledLink to="/ProvidersList" onClick={() => setOpen(!open)}>
          Schedule Service <FontAwesomeIcon icon={faCalendarAlt} size="1x" />
        </StyledLink>
      )}
      <StyledLink to="/dashboard" onClick={() => setOpen(!open)}>
        Dashboard <FontAwesomeIcon icon={faColumns} size="1x" />
      </StyledLink>
      <Logout handleClick={() => setOpen(!open)} />
    </StyledMenu>
  );
};

NavBar.propTypes = {
  open: bool.isRequired,
};

export default NavBar;
