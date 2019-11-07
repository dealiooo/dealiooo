import { call, put, delay } from 'redux-saga/effects';

import { api } from '../../../services';

import { resetPasswordAsync } from '../actions';
import { RESPONSE_DELAY } from '../config';

function* resetPasswordSaga(action: ReturnType<typeof resetPasswordAsync.request>) {
  const { token, password } = action.payload;

  try {
    yield call(api.post, `/reset-password/${token}`, { password });

    yield delay(RESPONSE_DELAY);
    yield put(resetPasswordAsync.success(true));
  } catch (error) {
    yield put(resetPasswordAsync.failure(error));
  }
}

export { resetPasswordSaga as resetPassword };
