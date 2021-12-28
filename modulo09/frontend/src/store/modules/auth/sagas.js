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
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Ussuário não é prestador');
      return;
    }

    // Token insertion on Axios
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados');
    yield put(signFailure());
  }
}

// Token keep alive
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  // Take latest ouve a action e dispara a função

  // Token keep alive with redux persist
  // OBS: só renderiza em tela a aplicação após recuperar os dados do redux persist
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  // Vamos ouvir o sign out também no saga de autenticação para mandar o usuário para a rota raiz '/'. (OBS: Não tem uma forma mais simples de fazer isso...?)
  takeLatest('@auth/SIGN_OUT', signOut),
]);
