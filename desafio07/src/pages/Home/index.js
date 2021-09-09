import React, { Component } from 'react';
import { connect } from 'react-redux';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import * as CartActions from '../../store/modules/cart/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Loading, ProductList, Product, ProductImage, ProductTitle, ProductPrice, Button, AmountButton, AmountText, TextButton } from './styles';

class Home extends Component {
  state = {
    products: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await api.get(`/products`);
    const data = response.data.map(product => ({
      ... product,
      priceFormatted: formatPrice(product.price),
    }));
    this.setState({
      products: data,
      loading: false,
    });
  }

  handleAddProduct = (id) => {
    const { dispatch } = this.props;
    dispatch(CartActions.addToCartRequest(id));
  }

  render() {
    const { products, loading } = this.state;
    const { amount } = this.props;
    return (
      <Container>
        { loading ? (
          <Loading />
        ) : ( <ProductList
          data={products}
          keyExtractor={product => product.id}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image }} />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>{item.priceFormatted}</ProductPrice>
              <Button onPress={() => this.handleAddProduct(item.id)}>
                <AmountButton>
                  <Icon name="add-shopping-cart" color="#fff" size={20} />
                  <AmountText>{amount[item.id] || 0}</AmountText>
                </AmountButton>
                <TextButton>Adicionar</TextButton>
              </Button>
            </Product>
          )}
        /> )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  // reduce array para único valor
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {})
});

export default connect(mapStateToProps)(Home);
