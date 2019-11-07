import { call, put } from 'redux-saga/effects';

import { clearAuth, signInAsync, signOutAsync } from '../actions';
import { api } from '../../../services';

function* signOutSaga(action: ReturnType<typeof signOutAsync.request>) {
  try {
    yield call(api.post, '/sign-out');
    yield put(signInAsync.success(false));
    yield put(signOutAsync.success(true));
    yield put(clearAuth());
  } catch (error) {
    yield put(signOutAsync.failure(error));
  }
}

export { signOutSaga as signOut };
