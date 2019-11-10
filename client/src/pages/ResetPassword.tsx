import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail as EmailIcon } from 'styled-icons/feather/Mail';

import { Root, Container, SignForm, Center } from '../components/layouts';
import { Input, Button, Title, FormError, StatusText } from '../components/atoms';
import { FormGroup, IconInput, Loader } from '../components/molecules';
import { AppNavBar } from '../components/organisms';
import { useInputValue, isBlank } from '../utils';
import {
  verifyResetPasswordAsync,
  resetPasswordAsync,
  selectResetPassword,
  selectVerifyResetPassword,
} from '../store/Account';
import { Redirect } from 'react-router';

export default function({ match }) {
  const { token } = match.params;
  const dispatch = useDispatch();
  const verifyResetPassword = useSelector(selectVerifyResetPassword);
  const resetPassword = useSelector(selectResetPassword);
  const password = useInputValue('');
  const blank = isBlank(password.value);

  useEffect(() => {
    dispatch(verifyResetPasswordAsync.request({ token }));
  }, [token]);

  const handleResetPassword = event => {
    event.preventDefault();
    dispatch(
      resetPasswordAsync.request({
        token,
        password: password.value,
      }),
    );
  };

  if (verifyResetPassword.error) {
    return <Redirect to="/" />;
  }

  return (
    <Root>
      <AppNavBar />
      <Container>
        <Center relativeToParent>
          <Loader size={30} />
        </Center>
        {verifyResetPassword.loading ? (
          <Center relativeToParent>
            <Loader size={30} />
          </Center>
        ) : resetPassword.data ? (
          <Center>
            <StatusText status="success">We've successfully resetted your password!</StatusText>
          </Center>
        ) : (
          <SignForm>
            <Title marginBottom>Reset Password</Title>
            <FormGroup label="Set your new password">
              <IconInput>
                <EmailIcon size={20} />
                <Input type="password" {...password} />
              </IconInput>
            </FormGroup>
            <Button
              type="submit"
              fullWidth
              loading={resetPassword.loading}
              disabled={blank}
              onClick={handleResetPassword}
            >
              Set as new password
            </Button>
            {resetPassword.error && <FormError error={resetPassword.error} />}
          </SignForm>
        )}
      </Container>
    </Root>
  );
}
