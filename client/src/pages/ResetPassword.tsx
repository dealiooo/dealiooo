import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { Mail as EmailIcon } from 'styled-icons/feather/Mail';

import { Root, Container, SignForm, Center } from '../layouts';
import { Input, Button, Title, FormError, FormGroup, IconInput, Loader } from '../components';
import { MainNavbar } from '../sections';
import { useInputValue, isBlank } from '../utils';
import {
  verifyResetPasswordAsync,
  resetPasswordAsync,
  selectResetPassword,
  selectVerifyResetPassword,
} from '../store/Account';

type ResetPasswordPageProps = {
  match;
};

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ match }) => {
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
      <MainNavbar />
      <Container>
        <Center relative>
          <Loader size={20} />
        </Center>
        {verifyResetPassword.loading ? (
          <Center relative>
            <Loader size={20} />
          </Center>
        ) : resetPassword.data ? (
          <Center>
            <div>We've successfully resetted your password!</div>
          </Center>
        ) : (
          <SignForm>
            <Title marginless>Reset Password</Title>
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
};

export default ResetPasswordPage;
