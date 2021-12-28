import { takeLatest, call, put, all } from '@redux-saga/core/effects';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

import { toast } from 'react-toastify';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    // Faz um ternário para checar se há oldPassword, se houver, envia o restante das informações para a request
    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );

    // Não é necessário id do usuário pois já está contido no token enviado
    const response = yield call(api.put, 'users', profile);
    toast.success('Perfil atualizado com sucesso!');
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
