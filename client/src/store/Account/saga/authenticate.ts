import { call, put } from 'redux-saga/effects';

import { authenticateAsync, setAuth } from '../actions';
import { api } from '../../../services';

function* authenticateSaga(action: ReturnType<typeof authenticateAsync.request>) {
  try {
    const response = yield call(api.get, '/authenticate');
    const auth = response.data;

    yield put(authenticateAsync.success(true));
    yield put(setAuth(auth));
  } catch (error) {
    yield put(authenticateAsync.failure(error));
  }
}

export { authenticateSaga as authenticate };
