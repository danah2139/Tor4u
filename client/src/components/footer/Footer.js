import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { StyledContainer } from "./footerStyle";

const Footer = () => {
  return (
    <StyledContainer>
      <p>©️ TOR4U</p>
      <a href="https://github.com/danah2139" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
      <a
        href="https://www.linkedin.com/in/dana-cohen-5176b514b/"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
    </StyledContainer>
  );
};
export default Footer;
