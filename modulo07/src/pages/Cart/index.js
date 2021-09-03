import React from 'react';
import { connect } from 'react-redux';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

function Cart({ cart, dispatch }) {
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
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>R$259,80</strong>
              </td>
              <td>
                <button type="button" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: product.id })}>
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
          <strong>R$1920,49</strong>
        </Total>
      </footer>
    </Container>
  );
}

// Esta função pega informações do estado e mapeia em formato de propriedades para o componente
const mapStateToProps = (state) => ({
  // Por exemplo vamos criar uma propriedade cart, que irá pegar todas as informações do state.cart
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);