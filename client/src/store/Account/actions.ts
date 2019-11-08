import { createAction, createAsyncAction } from 'typesafe-actions';

import { Auth } from '../../types/dealiooo';

export const setAuth = createAction('@account/SET_AUTH', action => (auth: Auth) => action(auth));
export const clearAuth = createAction('@account/CLEAR_AUTH', action => () => action());

export const authenticateAsync = createAsyncAction(
  '@account/AUTHENTICATE_REQUEST',
  '@account/AUTHENTICATE_SUCCESS',
  '@account/AUTHENTICATE_FAILURE',
)<undefined, boolean, Error>();

export const signInAsync = createAsyncAction(
  '@account/SIGN_IN_REQUEST',
  '@account/SIGN_IN_SUCCESS',
  '@account/SIGN_IN_FAILURE',
)<{ login: string; password: string }, boolean, Error>();

export const signUpAsync = createAsyncAction(
  '@account/SIGN_UP_REQUEST',
  '@account/SIGN_UP_SUCCESS',
  '@account/SIGN_UP_FAILURE',
)<{ username: string; email: string; password: string; passwordConfirm: string }, boolean, Error>();

export const signOutAsync = createAsyncAction(
  '@account/SIGN_OUT_REQUEST',
  '@account/SIGN_OUT_SUCCESS',
  '@account/SIGN_OUT_FAILURE',
)<undefined, boolean, Error>();

export const forgotPasswordAsync = createAsyncAction(
  '@account/FORGOT_PASSWORD_REQUEST',
  '@account/FORGOT_PASSWORD_SUCCESS',
  '@account/FORGOT_PASSWORD_FAILURE',
)<{ email: string }, boolean, Error>();

export const resetPasswordAsync = createAsyncAction(
  '@account/RESET_PASSWORD_REQUEST',
  '@account/RESET_PASSWORD_SUCCESS',
  '@account/RESET_PASSWORD_FAILURE',
)<{ token: string; password: string }, boolean, Error>();

export const verifyResetPasswordAsync = createAsyncAction(
  '@account/VERIFY_RESET_PASSWORD_REQUEST',
  '@account/VERIFY_RESET_PASSWORD_SUCCESS',
  '@account/VERIFY_RESET_PASSWORD_FAILURE',
)<{ token: string }, boolean, Error>();
