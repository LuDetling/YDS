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
`;

export default function Header() {
  return (
    <HeaderContent>
      <div className="left-nav">
        <NavLink to="/" className="button">Accueil</NavLink>
      </div>
      <div className="right-nav">
        <NavLink to="profil" className="button">Profil</NavLink>
        <NavLink to="idees" className="button">Idees</NavLink>
        <NavLink to="login" className="button">Se connecter</NavLink>
        <NavLink to="signup" className="button">S'inscrire</NavLink>
      </div>
    </HeaderContent>
  );
}
