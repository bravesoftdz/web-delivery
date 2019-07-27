import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from 'api';
import history from 'services/history';
import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.type !== 'admin') {
      toast.error('Desculpe, esta area é somente para administradores.');
      yield put(signInFailure());
      return;
    }

    yield put(signInSuccess(token, user));

    history.push('/pedidos');
  } catch (error) {
    toast.error('O usuário ou senha está incorreto, verique seus dados.');
    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
