import { NavLink } from "react-router-dom";
import styled from "styled-components";
import colors from "../styles/colors";

const HeaderContent = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: ${colors.primary};
  position: sticky;
  top: 0;
  a {
    text-decoration: none;
    padding: 5px 10px;
    width: 70px;
    text-align: center;
    border-radius: 5px;
    border: 2px solid ${colors.secondary};
    color: ${colors.secondary};
    transition: 0.3s;
    font-weight: bold;
    &.active {
      color: ${colors.primary};
      background-color: ${colors.secondary};
    }
    &:hover {
      color: ${colors.primary};
      background-color: ${colors.secondary};
    }
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
`;

export default function Header() {
  return (
    <HeaderContent>
      <div className="left-nav">
        <NavLink to="/">Accueil</NavLink>
      </div>
      <div className="right-nav">
        <NavLink to="profil">Profil</NavLink>
        <NavLink to="idees">Idees</NavLink>
        <NavLink to="login">Se connecter</NavLink>
        <NavLink to="signup">S'inscrire</NavLink>
      </div>
    </HeaderContent>
  );
}
