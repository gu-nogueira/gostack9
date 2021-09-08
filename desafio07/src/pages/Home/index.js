import React, { Component } from 'react';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, ProductList, Product, ProductImage, ProductTitle, ProductPrice, Button, AmountButton, AmountText, TextButton } from './styles';

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

  render() {
    const { products } = this.state;
    return (
      <Container>
        <ProductList
          data={products}
          keyExtractor={product => product.id}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image }} />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>{item.priceFormatted}</ProductPrice>
              <Button>
                <AmountButton>
                  <Icon name="add-shopping-cart" color="#fff" size={20} />
                  <AmountText>{0}</AmountText>
                </AmountButton>
                <TextButton>Adicionar</TextButton>
              </Button>
            </Product>
          )}
        />

      </Container>
    );
  }
}

export default Home;
