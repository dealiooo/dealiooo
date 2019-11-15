import { call, put, delay } from 'redux-saga/effects';

import { signUpAsync, setAuth, signOutAsync } from '../actions';
import { api, restartSocketConnection } from '../../../services';
import { RESPONSE_DELAY } from '../config';
import { isEmailValid } from '../../../utils';

function* signUpSaga(action: ReturnType<typeof signUpAsync.request>) {
  const { username, email, password, passwordConfirm } = action.payload;

  try {
    if (!isEmailValid(email)) {
      throw Error('email is invalid');
    }

    if (password !== passwordConfirm) {
      throw Error('passwords do not match');
    }

    const response = yield call(api.post, '/sign-up', { username, email, password });
    const { auth } = response.data;

    yield delay(RESPONSE_DELAY);
    yield put(signOutAsync.success(false));
    yield put(signUpAsync.success(true));

    restartSocketConnection();
    yield put(setAuth(auth));
  } catch (error) {
    yield put(signUpAsync.failure(error));
  }
}

export { signUpSaga as signUp };
