import { Alert } from 'react-native';
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import { formatPrice } from '../../../utils/format';
import * as Navigation from '../../../services/navigation';

// Actions para o saga
import { addToCartSuccess, updateAmountSuccess } from './actions';

// Generator function (assíncrono)
function* addToCart({ id }) {
  // Select para capturar o state
  const productExists = yield select(state => state.cart.find(p => p.id == id));

  // Todos os effects do saga precisam de 'yield' (assíncrono)
  const stock = yield call(api.get, `/stock/${id}`);

  // Estoque na api
  const stockAmount = stock.data.amount;

  // Quantidade atual em carrinho
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  // Verifica se há disponível em estoque
  if (amount > stockAmount) {
    Alert.alert('Quantidade solicitada fora de estoque');
    return;
  }

  // Verifica se o produto já existe para incrementar quantidade
  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      formatPrice: formatPrice(response.data.price),
    }
    yield put(addToCartSuccess(data));
    Navigation.navigate('Cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    Alert.alert('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

// Ouve as actions e dispara a função do saga
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
