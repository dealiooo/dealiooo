import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail as EmailIcon } from 'styled-icons/feather/Mail';

import { Root, SignForm, Container, Center } from '../components/layouts';
import { Input, Button, Title, FormError, StatusText } from '../components/atoms';
import { FormGroup, IconInput } from '../components/molecules';
import { AppNavBar } from '../components/organisms';
import { useInputValue, isBlank } from '../utils';
import { selectForgotPassword, forgotPasswordAsync } from '../store/Account';

export default function() {
  const dispatch = useDispatch();
  const forgotPassword = useSelector(selectForgotPassword);
  const email = useInputValue('');
  const blank = isBlank(email.value);

  const handleForgotPassword = event => {
    event.preventDefault();
    dispatch(
      forgotPasswordAsync.request({
        email: email.value,
      }),
    );
  };

  return (
    <Root>
      <AppNavBar />
      <Container>
        {forgotPassword.data ? (
          <Center>
            <StatusText status="success">Successfully sent. Check your email and spam for the reset link.</StatusText>
          </Center>
        ) : (
          <SignForm>
            <Title marginBottom>Forgot Password</Title>
            <FormGroup label="Email">
              <IconInput>
                <EmailIcon size={20} />
                <Input type="email" {...email} />
              </IconInput>
            </FormGroup>
            <Button
              type="submit"
              fullWidth
              loading={forgotPassword.loading}
              disabled={blank}
              onClick={handleForgotPassword}
            >
              Send reset link to my email
            </Button>
            {forgotPassword.error && <FormError error={forgotPassword.error} />}
          </SignForm>
        )}
      </Container>
    </Root>
  );
}
