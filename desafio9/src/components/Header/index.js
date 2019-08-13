import React from "react";
import { useSelector , useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { Container, Content, Profile } from "./styles";
import { signOut } from "~/store/modules/auth/actions";


import logo from "~/assets/M.svg";

export default function Header() {

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        
        <Link to="/dashboard" ><img src={logo} alt="MeetUp" /></Link>
        

        <aside>
          <Profile>
            <div>
              <strong> {profile.name} </strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <button  onClick={handleSignOut} type="button">Sair</button>
            
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
