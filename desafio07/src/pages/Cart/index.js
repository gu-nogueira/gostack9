import React from 'react';
import { connect } from 'react-redux';

import { formatPrice } from '../../utils/format';

import * as CartActions from '../../store/modules/cart/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Card, ProductList, Product, ProductInfo, ProductImage, ProductDetails, ProductTitle, ProductPrice, ProductDelete, ProductControls, ProductControlButton, ProductAmount, ProductSubtotal, TotalContainer, TotalText, TotalAmount, Order, OrderText, EmptyContainer, EmptyText } from './styles';
import colors from '../../styles/colors';

function Cart ({ navigation, cart, total, dispatch }) {

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      <Card>
        {cart.length ?
        <>
          <ProductList>
            {cart.map(product => (
              <Product key={product.id}>
                <ProductInfo>
                  <ProductImage source={{ uri: product.image }} />
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>{product.priceFormatted}</ProductPrice>
                  </ProductDetails>
                  <ProductDelete onPress={() => dispatch(CartActions.removeFromCart(product.id))}>
                    <Icon name="delete-forever" size={24} color={colors.primary} />
                  </ProductDelete>
                </ProductInfo>
                <ProductControls>
                  <ProductControlButton onPress={() => decrement(product)}>
                    <Icon
                      name="remove-circle-outline"
                      size={20}
                      color={colors.primary}
                    />
                  </ProductControlButton>
                  <ProductAmount value={String(product.amount)} />
                  <ProductControlButton onPress={() => increment(product)}>
                    <Icon
                      name="add-circle-outline"
                      size={20}
                      color={colors.primary}
                    />
                  </ProductControlButton>
                  <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                </ProductControls>
              </Product>
            ))}
          </ProductList>
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>{total}</TotalAmount>
            <Order>
              <OrderText>FINALIZAR PEDIDO</OrderText>
            </Order>
          </TotalContainer>
        </> :
        <EmptyContainer>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Não há nada aqui :(</EmptyText>
        </EmptyContainer>}
      </Card>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  // reduce array para único valor
  total: formatPrice(state.cart.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0)),
});

export default connect(mapStateToProps)(Cart);
