import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { deliverymanId } = payload;
    const response = yield call(api.get, `deliverymen/${deliverymanId}`);

    const { name, email, avatar } = response.data;
    const deliveryman = {
      id: deliverymanId,
      name,
      email,
      avatar: avatar?.url,
    };

    // ** Token insertion on Axios
    // api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(deliveryman));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados',
    );
    yield put(signFailure());
  }
}

// export function* signUp({ payload }) {
//   try {
//     const { name, email, password } = payload;

//     yield call(api.post, 'users', {
//       name,
//       email,
//       password,
//     });

//     // history.push('/');
//   } catch (err) {
//     Alert.alert(
//       'Falha no cadastro',
//       'Houve um erro no cadastro, verifique seus dados',
//     );
//     yield put(signFailure());
//   }
// }

// Token keep alive
export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  // takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
