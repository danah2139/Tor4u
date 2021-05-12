import { StyledHeader, StyledH1, StyledLink } from "./headerStyle";
import { isUserLoggedIn } from "../../apis/usersApi";
import { useEffect, useState } from "react";
const Header = () => {
  const [path, setPath] = useState("/");
  useEffect(() => {
    (async () => {
      (await isUserLoggedIn()) ? setPath("/dashboard") : setPath("/");
    })();
  }, []);
  return (
    <StyledHeader>
      <StyledLink to={path}>
        <StyledH1>Tor4U</StyledH1>
      </StyledLink>
    </StyledHeader>
  );
};
export default Header;
