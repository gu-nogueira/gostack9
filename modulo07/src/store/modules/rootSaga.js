// o root saga terá a mesma funcionalidade do rootReducer, de juntar todos os saga em um único arquivo

// o all será só para juntar vários sagas
import { all } from 'redux-saga/effects';

// All sagas
import cart from './cart/sagas';

export default function* rootSaga() {
  return yield all([
    cart
  ]);
}
