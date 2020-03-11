import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import { AsyncActionCreatorBuilder } from 'typesafe-actions';

import * as actions from './actions';

const authReducer = createReducer(null)
  .handleAction(actions.setAuth, (state, action) => action.payload)
  .handleAction(actions.clearAuth, (state, action) => null);

const asyncActionReducerCreator = (asyncAction: AsyncActionCreatorBuilder<any, any, any>) => {
  return createReducer({
    loading: false,
    data: null,
    error: null,
  })
    .handleAction(asyncAction.request, (state, action) => ({ ...state, loading: true, error: null }))
    .handleAction(asyncAction.success, (state, action) => ({ ...state, loading: false, data: action.payload }))
    .handleAction(asyncAction.failure, (state, action) => ({ ...state, loading: false, error: action.payload }));
};

export const accountReducer = combineReducers({
  auth: authReducer,
  authenticate: asyncActionReducerCreator(actions.authenticateAsync),
  signIn: asyncActionReducerCreator(actions.signInAsync),
  signOut: asyncActionReducerCreator(actions.signOutAsync),
  signUp: asyncActionReducerCreator(actions.signUpAsync),
  forgotPassword: asyncActionReducerCreator(actions.forgotPasswordAsync),
  resetPassword: asyncActionReducerCreator(actions.resetPasswordAsync),
  verifyResetPassword: asyncActionReducerCreator(actions.verifyResetPasswordAsync),
});

export type AccountState = ReturnType<typeof accountReducer>;
