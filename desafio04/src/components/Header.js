import React from 'react';

import Logo from '../assets/facebook-logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <header>
      <img src={Logo} className="logo" />
      <a href="http://">
        <span>Meu perfil</span>
        <FontAwesomeIcon icon={faUserCircle} className="icon" />
      </a>
    </header>
  );
}

export default Header;