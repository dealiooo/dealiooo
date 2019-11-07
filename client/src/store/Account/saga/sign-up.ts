import { call, put } from 'redux-saga/effects';

import { signUpAsync, setAuth } from '../actions';
import { api } from '../../../services';

function* signUpSaga(action: ReturnType<typeof signUpAsync.request>) {
  const { username, email, password, passwordConfirm } = action.payload;

  try {
    if (password !== passwordConfirm) {
      throw Error('passwords do not match');
    }

    const response = yield call(api.post, '/sign-up', { username, email, password });
    const { auth } = response.data;
    yield put(signUpAsync.success(true));

    yield put(setAuth(auth));
  } catch (error) {
    yield put(signUpAsync.failure(error));
  }
}

export { signUpSaga as signUp };
