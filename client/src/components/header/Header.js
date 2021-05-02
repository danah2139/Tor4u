import { StyledHeader, StyledH1, StyledLink } from "./headerStyle";
const Header = () => {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <StyledH1>Tor4U</StyledH1>
      </StyledLink>
    </StyledHeader>
  );
};
export default Header;
