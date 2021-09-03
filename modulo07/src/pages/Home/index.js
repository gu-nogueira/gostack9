import React from 'react';

import { MdAddShoppingCart } from 'react-icons/md'

import { ProductList } from './styles';

function Home() {
  return (
    <ProductList>
      <li>
        <img src="https://static.netshoes.com.br/produtos/tenis-nike-sb-chron-solarsoft/26/HZM-5102-026/HZM-5102-026_detalhe1.jpg?ts=1622478944?ims=280x280" alt="Tênis" />
        <strong>Tênis muito foda</strong>
        <span>R$129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img src="https://static.netshoes.com.br/produtos/tenis-nike-sb-chron-solarsoft/26/HZM-5102-026/HZM-5102-026_detalhe1.jpg?ts=1622478944?ims=280x280" alt="Tênis" />
        <strong>Tênis muito foda</strong>
        <span>R$129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img src="https://static.netshoes.com.br/produtos/tenis-nike-sb-chron-solarsoft/26/HZM-5102-026/HZM-5102-026_detalhe1.jpg?ts=1622478944?ims=280x280" alt="Tênis" />
        <strong>Tênis muito foda</strong>
        <span>R$129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img src="https://static.netshoes.com.br/produtos/tenis-nike-sb-chron-solarsoft/26/HZM-5102-026/HZM-5102-026_detalhe1.jpg?ts=1622478944?ims=280x280" alt="Tênis" />
        <strong>Tênis muito foda</strong>
        <span>R$129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>

      <li>
        <img src="https://static.netshoes.com.br/produtos/tenis-nike-sb-chron-solarsoft/26/HZM-5102-026/HZM-5102-026_detalhe1.jpg?ts=1622478944?ims=280x280" alt="Tênis" />
        <strong>Tênis muito foda</strong>
        <span>R$129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 3
          </div>

          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    </ProductList>
  );
}

export default Home;
