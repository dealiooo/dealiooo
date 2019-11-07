import { createSelector } from 'reselect';

import { RootState } from '../types';

const selectAccount = (state: RootState) => state.account;

export const selectAuth = createSelector(
  selectAccount,
  account => account.auth,
);

export const selectAuthenticate = createSelector(
  selectAccount,
  account => account.authenticate,
);

export const selectResetPassword = createSelector(
  selectAccount,
  account => account.resetPassword,
);

export const selectSignIn = createSelector(
  selectAccount,
  account => account.signIn,
);

export const selectSignOut = createSelector(
  selectAccount,
  account => account.signOut,
);

export const selectSignUp = createSelector(
  selectAccount,
  account => account.signUp,
);

export const selectVerifyResetPassword = createSelector(
  selectAccount,
  account => account.verifyResetPassword,
);

export const selectForgotPassword = createSelector(
  selectAccount,
  account => account.forgotPassword,
);
