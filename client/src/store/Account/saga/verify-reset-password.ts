import { call, put } from 'redux-saga/effects';

import { verifyResetPasswordAsync } from '../actions';
import { api } from '../../../services';

function* verifyResetPasswordSaga(action: ReturnType<typeof verifyResetPasswordAsync.request>) {
  const { token } = action.payload;

  try {
    yield call(api.get, `/reset-password/${token}`);
    yield put(verifyResetPasswordAsync.success(true));
  } catch (error) {
    yield put(verifyResetPasswordAsync.failure(error));
  }
}

export { verifyResetPasswordSaga as verifyResetPassword };
