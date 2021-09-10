import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../services/api';
import { formatPrice } from '../../utils/format';

import * as CartActions from '../../store/modules/cart/actions';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Loading, ProductList, Product, ProductImage, ProductTitle, ProductPrice, Button, AmountButton, AmountText, TextButton } from './styles';

function Home() {
  const amount = useSelector(state =>
    // reduce = reduz array para único valor
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
  }, {}));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState('false');
  const dispatch = useDispatch();

  // componentDidMount
  useEffect(() => {
    setLoading(true);
    async function loadProducts() {
      const response = await api.get(`/products`);
      const data = response.data.map(product => ({
        ... product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

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
            <Button onPress={() => handleAddProduct(item.id)}>
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

export default Home;
