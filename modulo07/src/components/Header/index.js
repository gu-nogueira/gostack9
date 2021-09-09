import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

// feito o connect, podemos pegar cart de dentro das props
function Header({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rocketshoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}

// O 'connect()' pode receber parâmetros, o primeiro parâmetro que ele pode receber é uma função, nesta função será recebido como argumento o estado, e nesse estado devemos passar os parâmetros que queremos importar
// O que deve retornar é um objeto, por isso, passamos depois de '=>' parênteses seguidos de chaves, para retornar o objeto diretamente
export default connect((state) => ({
  // 'cartSize:' é o reducer de cart
  cartSize: state.cart.length,
}))(Header);
