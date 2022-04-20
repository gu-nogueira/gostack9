import React from 'react';

import { Container, Menu, Profile } from './styles';
import { MdOutlineLogout } from 'react-icons/md';
import Logo from '../../assets/svgs/logo.svg';


function Header() {
  return <Container>
    <nav>
    <img src={Logo} alt="Logo" />
    <Menu>
      <li>Encomendas</li>
      <li>Entregadores</li>
      <li>Destinatários</li>
      <li>Problemas</li>
    </Menu>
    </nav>
    <Profile>
      <span>Admin FastFeet</span>
      <button>Fazer Logout <MdOutlineLogout /></button>
    </Profile>
  </Container>;
}

export default Header;
