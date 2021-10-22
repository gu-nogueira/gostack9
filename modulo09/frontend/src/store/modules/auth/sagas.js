import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

// Exportamos as funções para facilitar nos testes
export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    // Call é um método que retorna uma promise
    const response = yield call(api.post, 'sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Ussuário não é prestador');
      return;
    }

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export default all([
  // Take latest ouve a action e dispara a função
  takeLatest('@auth/SIGN_IN_REQUEST', signIn)
]);
