import { call, put, delay } from 'redux-saga/effects';

import { signInAsync, signOutAsync, setAuth } from '../actions';
import { api } from '../../../services';
import { RESPONSE_DELAY } from '../config';

function* signInSaga(action: ReturnType<typeof signInAsync.request>) {
  const { login, password } = action.payload;

  try {
    const response = yield call(api.post, '/sign-in', { identifier: login, password });
    const { auth } = response.data;

    yield delay(RESPONSE_DELAY);
    yield put(signOutAsync.success(false));
    yield put(signInAsync.success(true));
    yield put(setAuth(auth));
  } catch (error) {
    yield put(signInAsync.failure(error));
  }
}

export { signInSaga as signIn };
