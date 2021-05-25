import { StyledHeader, StyledH1, StyledLink } from "./headerStyle";
import { isUserLoggedIn } from "../../apis/usersApi";
import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks";

import FocusLock from "react-focus-lock";
import { useLocation } from "react-router-dom";
import Burger from "../utils/burger/Burger";
import NavBar from "../navBar/NavBar";
const Header = () => {
  const [path, setPath] = useState("/");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setIsOpen(false));
  const menuId = "main-menu";
  const { pathname } = useLocation();

  // const { push } = useHistory();
  useEffect(() => {
    // (async () => {
    //   //let flag = await isUserLoggedIn();
    //   setLoggedIn(isUserLoggedIn());
    //   isLoggedIn ? setPath("/dashboard") : setPath("/");
    // })();
    // console.log(params);
    // if(params !=='/'){

    // }
    setLoggedIn(isUserLoggedIn());
    console.log("isLoggedIn", pathname);
    isLoggedIn ? setPath("/dashboard") : setPath("/");
  }, [pathname, isLoggedIn]);
  return (
    <StyledHeader>
      {pathname !== "/" && pathname !== "/login" && (
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
