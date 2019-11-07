import { all, takeLatest } from 'redux-saga/effects';

import { authenticate } from './authenticate';
import { signIn } from './sign-in';
import { signUp } from './sign-up';
import { signOut } from './sign-out';
import { forgotPassword } from './forgot-password';
import { resetPassword } from './reset-password';
import { getType } from 'typesafe-actions';
import * as actions from '../actions';

export default function* accountSaga() {
  yield all([
    takeLatest(getType(actions.authenticateAsync.request), authenticate),
    takeLatest(getType(actions.signInAsync.request), signIn),
    takeLatest(getType(actions.signUpAsync.request), signUp),
    takeLatest(getType(actions.signOutAsync.request), signOut),
    takeLatest(getType(actions.forgotPasswordAsync.request), forgotPassword),
    takeLatest(getType(actions.resetPasswordAsync.request), resetPassword),
  ]);
}
