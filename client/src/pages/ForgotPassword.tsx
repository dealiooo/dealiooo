import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail as EmailIcon } from '@styled-icons/feather/Mail';

import { Root, SignForm, Container, Center } from '../layouts';
import { Input, Button, Title, FormError, FormGroup, IconInput } from '../components';
import { MainNavbar } from '../sections';
import { useInputValue, isBlank } from '../utils';
import { selectForgotPassword, forgotPasswordAsync } from '../store/Account';

const ForgotPasswordPage: React.FC = props => {
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
      <MainNavbar />
      <Container>
        {forgotPassword.data ? (
          <Center>
            <div>Successfully sent. Check your email and spam for the reset link.</div>
          </Center>
        ) : (
          <SignForm>
            <Title marginless>Forgot Password</Title>
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
};

export default ForgotPasswordPage;
