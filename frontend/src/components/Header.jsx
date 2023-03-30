import { NavLink } from "react-router-dom";
import styled from "styled-components";
import colors from "../styles/colors";
import Logout from '../pages/Log/Logout'
import { useSelector } from "react-redux";

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

const HeaderContent = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.secondary};
  height: 72px;
  position: sticky;
  top: 0;
  font-size: 20px;
  padding: 0 16px;
  /* box-shadow: 0px 2px 10px white; */
  border-bottom: 1px solid white;
  .left-nav {
    display: flex;
    align-items: center;
  }
  .right-nav {
    display: flex;
    align-items: center;
  }
`;