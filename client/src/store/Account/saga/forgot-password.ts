import { call, put, delay } from 'redux-saga/effects';

import { forgotPasswordAsync } from '../actions';
import { api } from '../../../services';
import { RESPONSE_DELAY } from '../config';

function* forgotPasswordSaga(action: ReturnType<typeof forgotPasswordAsync.request>) {
  const { email } = action.payload;

  try {
    yield call(api.post, '/forgot-password', { email });

    yield delay(RESPONSE_DELAY);
    yield put(forgotPasswordAsync.success(true));
  } catch (error) {
    yield put(forgotPasswordAsync.failure(error));
  }
}

export { forgotPasswordSaga as forgotPassword };
