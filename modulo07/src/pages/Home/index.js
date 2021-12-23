import React, { Component } from 'react';
import { connect } from 'react-redux';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

// Dando import all as 'CartActions', todas as actions poderão dar autocomplete com 'CartActions.<ctrl + barra>'
import * as CartActions from '../../store/modules/cart/actions';

import { MdAddShoppingCart } from 'react-icons/md'
import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    const response = await api.get('/products');

    // Vamos formatar o preço uma única vez assim que o componente montar, pois caso inseríssemos a função diretamente no state, qualquer pequena alteração que o state sofresse iria rodar a função novamente e isso pode ficar ineficiente de acordo com a proporção que a aplicação for tomando
    // Então, o que vamos fazer é percorrer o array retornado por response e inserir um novo atributo chamado priceformatted no objeto
    const data = response.data.map(product => ({
      ... product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = (id) => {
    // Dispatch serve para disparar uma action ao reducer
    const { dispatch } = this.props;
    dispatch(CartActions.addToCartRequest(id));
  }

  // Uma coisa que devemos tomar cuidado no React é trabalhar FUNÇÕES dentro do render, devemos ao máximo tabalhar para tratar as informaçõres antes de chegar no render, essa parte de tratamento de valores, textos, etc...
  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        { products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button" onClick={() => {this.handleAddProduct(product.id)}}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" /> {amount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}


const mapStateToProps = (state) => ({
  // o parâmetro recebido 'amount' será um objeto com id do produto e quantidade em carrinho
  amount: state.cart.reduce((amount, product) => {
    // Aqui criamos um novo valor de amount só que baseado em seu id de produto
    amount[product.id] = product.amount;
    return amount;
    // Estamos retornando um objeto, então criamos um objeto vazio para iniciar
  }, {})
});

// São dois parênteses pois '.connect' retorna outra função, que é chamada passando o componente 'Home'. Isso faz a conexão do state com o reducer
export default connect(mapStateToProps)(Home);
