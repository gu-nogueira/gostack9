import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../../store/modules/auth/actions';

import { Container, Menu, Item, Profile } from './styles';
import { MdOutlineLogout } from 'react-icons/md';
import Logo from '../../assets/svgs/logo.svg';

function Header() {
  const menu = ['Encomendas', 'Entregadores', 'Destinatários', 'Problemas'];
  const routes = ['deliveries', 'deliverymen', 'recipients', 'problems'];
  const [selected, setSelected] = useState('Encomendas');

  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <nav>
        <img src={Logo} alt="Logo" />
        <Menu>
          {menu.map((item, index) => (
            <Item
              key={index}
              route={`/${routes[index]}`}
              onClick={() => setSelected(item)}
              selected={selected === item ? true : false}
            >
              {item}
            </Item>
          ))}
        </Menu>
      </nav>
      <Profile>
        <span>{profile.name}</span>
        <button onClick={handleLogout}>
          Fazer Logout <MdOutlineLogout />
        </button>
      </Profile>
    </Container>
  );
}

export default Header;
