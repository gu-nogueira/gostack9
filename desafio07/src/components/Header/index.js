import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Wrapper, Container, Logo, Cart, Counter } from './styles';

const Header = ({ props }) => {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <Cart onPress={() => {navigation.navigate('Cart')}}>
          <Icon name="shopping-cart" color="#FFF" size={24} />
          <Counter>{0}</Counter>
        </Cart>
      </Container>
    </Wrapper>
  );
}

export default Header;
