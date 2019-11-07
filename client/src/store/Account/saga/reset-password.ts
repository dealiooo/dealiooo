import { call, put } from 'redux-saga/effects';

import { api } from '../../../services';

import { resetPasswordAsync } from '../actions';

function* resetPasswordSaga(action: ReturnType<typeof resetPasswordAsync.request>) {
  const { token, password } = action.payload;

  try {
    yield call(api.post, `/reset-password/${token}`, { password });
    yield put(resetPasswordAsync.success(true));
  } catch (error) {
    yield put(resetPasswordAsync.failure(error));
  }
}

export { resetPasswordSaga as resetPassword };
