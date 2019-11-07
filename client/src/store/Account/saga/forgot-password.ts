import { call, put } from 'redux-saga/effects';

import { forgotPasswordAsync } from '../actions';
import { api } from '../../../services';

function* forgotPasswordSaga(action: ReturnType<typeof forgotPasswordAsync.request>) {
  const { email } = action.payload;

  try {
    yield call(api.post, '/forgot-password', { email });
    yield put(forgotPasswordAsync.success(true));
  } catch (error) {
    yield put(forgotPasswordAsync.failure(error));
  }
}

export { forgotPasswordSaga as forgotPassword };
