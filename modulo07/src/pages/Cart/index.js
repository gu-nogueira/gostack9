import React from 'react';
import { connect } from 'react-redux';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../utils/format';

import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';

function Cart({ cart, total, dispatch }) {
  // Posso criar function dentro de function sem problema nenhum
  // As validações serão feitas sempre dentro do redux, o componente apenas dispara a ação
  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QUANTIA</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { cart.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button type="button" onClick={() => dispatch(CartActions.removeFromCart(product.id))}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

// Esta função pega informações do estado e mapeia em formato de propriedades para o componente
const mapStateToProps = (state) => ({
  // Por exemplo vamos criar uma propriedade cart, que irá pegar todas as informações do state.cart
  // Aqui realizamos um '.map()' para adicionar, calcular e mostrar o campo subtotal em product, podemos fazer isso no reducer também
  // Feito aqui ele só irá atualizar se alguma informação no reducer for atualizada
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  // reduce utilizamos quando queremos reduzir um array a um único valor
  total: formatPrice(state.cart.reduce((total, product) => {
    return total + product.price * product.amount;
    // Inicia com zero
  }, 0)),
});

export default connect(mapStateToProps)(Cart);
