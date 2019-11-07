import { call, put, delay } from 'redux-saga/effects';

import { authenticateAsync, setAuth } from '../actions';
import { api } from '../../../services';
import { RESPONSE_DELAY } from '../config';
function* authenticateSaga(action: ReturnType<typeof authenticateAsync.request>) {
  try {
    const response = yield call(api.get, '/authenticate');
    const auth = response.data;

    yield delay(RESPONSE_DELAY);
    yield put(authenticateAsync.success(true));
    yield put(setAuth(auth));
  } catch (error) {
    yield put(authenticateAsync.failure(error));
  }
}

export { authenticateSaga as authenticate };
