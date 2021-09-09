import React from 'react';

import { connect } from 'react-redux';

import { Wrapper, Container, Logo, LogoImage, CartSection, Cart, Counter } from './styles';

// props de function component vem no parâmetro da função
function Header ({ navigation, cartSize }) {
  return (
    <Wrapper>
      <Container>
        <Logo onPress={() => {navigation.navigate('Home')}}>
          <LogoImage  />
        </Logo>
        <CartSection>
          <Cart onPress={() => {navigation.navigate('Cart')}} />
          { cartSize > 0 ? <Counter>{cartSize}</Counter> : null }
        </CartSection>
      </Container>
    </Wrapper>
  );
}

export default connect((state) => ({
  // Tamanho do reducer 'cart'
  cartSize: state.cart.length
}))(Header);
