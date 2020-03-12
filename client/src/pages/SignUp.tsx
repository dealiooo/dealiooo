import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { Mail as EmailIcon } from '@styled-icons/feather/Mail';
import { Lock as LockIcon } from '@styled-icons/feather/Lock';
import { User as UserIcon } from '@styled-icons/feather/User';

import { Root, Container, SignForm } from '../layouts';
import { MainNavbar } from '../sections';
import { Input, Button, FormError, FormGroup, IconInput, Link, Strong } from '../components';
import { signUpAsync, selectSignUp, selectAuth } from '../store/Account';
import { useInputValue, isBlank } from '../utils';
import { constants } from '../styles';

const { spaces } = constants;

const UserLayout = styled.div`
  margin-bottom: ${spaces.xl};

  & > ${Link} {
    margin-left: ${spaces.xxs};
  }
`;

const SignUpProps: React.FC = props => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const signUp = useSelector(selectSignUp);

  const username = useInputValue('');
  const email = useInputValue('');
  const password = useInputValue('');
  const passwordConfirm = useInputValue('');
  const blank =
    isBlank(username.value) || isBlank(email.value) || isBlank(password.value) || isBlank(passwordConfirm.value);

  const handleSignUp = event => {
    event.preventDefault();
    dispatch(
      signUpAsync.request({
        username: username.value,
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      }),
    );
  };

  if (auth || signUp.data) {
    return <Redirect to="/" />;
  }

  return (
    <Root>
      <MainNavbar />
      <Container>
        <SignForm onSubmit={handleSignUp}>
          <UserLayout>
            Already have an account?
            <Strong as={Link} to="/sign-in" underline>
              Log In!
            </Strong>
          </UserLayout>
          <FormGroup label="Email">
            <IconInput>
              <EmailIcon size={20} />
              <Input type="email" {...email} />
            </IconInput>
          </FormGroup>
          <FormGroup label="Username">
            <IconInput>
              <UserIcon size={20} />
              <Input type="text" {...username} />
            </IconInput>
          </FormGroup>
          <FormGroup label="Password">
            <IconInput>
              <LockIcon size={20} />
              <Input type="password" {...password} />
            </IconInput>
          </FormGroup>
          <FormGroup label="Confirm Password">
            <IconInput>
              <LockIcon size={20} />
              <Input type="password" {...passwordConfirm} />
            </IconInput>
          </FormGroup>
          <Button fullWidth type="submit" loading={signUp.loading} disabled={blank}>
            Sign Up
          </Button>
          {signUp.error && <FormError error={signUp.error} />}
        </SignForm>
      </Container>
    </Root>
  );
};

export default SignUpProps;
