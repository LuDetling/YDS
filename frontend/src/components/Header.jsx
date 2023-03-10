import { NavLink } from "react-router-dom";
import styled from "styled-components";
import colors from "../styles/colors";
import Logout from '../pages/Log/Logout'
import { useSelector } from "react-redux";


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
  const { userInfo } = useSelector(state => state.user.userLogin)
  return (
    <HeaderContent>
      <div className="left-nav">
        <NavLink to="/" className="button">Accueil</NavLink>
      </div>
      <div className="right-nav">
        {
          ((userInfo) && <>
            <NavLink to="profil" className="button">Profil</NavLink>
            <NavLink to="idees" className="button">Idees</NavLink>
            <Logout />
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
