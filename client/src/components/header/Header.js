import { StyledHeader, StyledH1, StyledLink } from "./headerStyle";
import { isUserLoggedIn } from "../../apis/usersApi";
import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks";

import FocusLock from "react-focus-lock";
import { useHistory } from "react-dom";
import Burger from "../utils/burger/Burger";
import NavBar from "../navBar/NavBar";
const Header = () => {
  const [path, setPath] = useState("/");
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setIsOpen(false));
  const menuId = "main-menu";
  // const { push } = useHistory();
  useEffect(() => {
    (async () => {
      let flag = await isUserLoggedIn();
      flag ? setPath("/dashboard") : setPath("/");
    })();
  }, [path]);
  return (
    <StyledHeader>
      {path === "/dashboard" && (
        <div ref={node}>
          <FocusLock disabled={!isOpen}>
            <Burger open={isOpen} setOpen={setIsOpen} aria-controls={menuId} />
            <NavBar open={isOpen} setOpen={setIsOpen} id={menuId} />
          </FocusLock>
        </div>
      )}
      <StyledLink to={path}>
        <StyledH1>Tor4U</StyledH1>
      </StyledLink>
    </StyledHeader>
  );
};
export default Header;
