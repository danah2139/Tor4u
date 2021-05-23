import styled from "styled-components";
import { Link } from "react-router-dom";
export const StyledLink = styled(Link)`
  color: white;
  font-size: 1.2em;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  padding: 5px;
  border: 1px solid transparent;
  &:hover {
    // color: ${({ theme }) => theme.lightBlue};
    border: 2px solid;
    border-radius: 3px;
  }
`;
export const StyledText = styled.h2`
  color: white;
  padding: 10px;
  margin: 10px 0;
`;

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryLight};
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    font-size: 1rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
