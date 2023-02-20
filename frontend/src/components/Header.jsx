import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="profil">Profil</NavLink>
      <NavLink to="idees">Idees</NavLink>
    </header>
  );
}
