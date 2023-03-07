import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../styles/colors";
// import { useSelector } from "react-redux";

const HeaderContent = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: ${colors.primary};
  position: sticky;
  top: 0;
  .right-nav {
    display: flex;
    align-items: center;
  }
`;

export default function Header() {

  const navigate = useNavigate();
  const connected = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    console.log("test")
    localStorage.removeItem("user");
    navigate("/login");
    return;
  }
  return (
    <HeaderContent>
      <div className="left-nav">
        <NavLink to="/" className="button">Accueil</NavLink>
      </div>
      <div className="right-nav">
        {
          (connected && <>
            <NavLink to="profil" className="button">Profil</NavLink>
            <NavLink to="idees" className="button">Idees</NavLink>
            <button onClick={logout} className="button danger-button">Se déconnecter</button>
          </>) || (
            <>
              <NavLink to="login" className="button">Se connecter</NavLink>
              <NavLink to="signup" className="button">S'inscrire</NavLink>
            </>
          )
        }
      </div>
    </HeaderContent>
  );
}
