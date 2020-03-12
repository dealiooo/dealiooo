import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { Lock as LockIcon } from '@styled-icons/feather/Lock';
import { User as UserIcon } from '@styled-icons/feather/User';

import { Root, Container, SignForm } from '../layouts';
import { MainNavbar } from '../sections';
import { Input, Button, Link, FormError, FormGroup, IconInput, Strong } from '../components';
import { constants } from '../styles';
import { signInAsync, selectSignIn, selectAuth } from '../store/Account';
import { useInputValue, isBlank } from '../utils';

const { spaces } = constants;

const GuestLayout = styled.div`
  margin-top: ${spaces.xxxl};
  margin-bottom: ${spaces.md};

  & > ${Link} {
    margin-left: ${spaces.xxs};
  }
`;

const SignInPage: React.FC = props => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const signIn = useSelector(selectSignIn);
  const login = useInputValue('');
  const password = useInputValue('');
  const blank = isBlank(login.value) || isBlank(password.value);

  const handleSignIn = event => {
    event.preventDefault();
    dispatch(
      signInAsync.request({
        login: login.value,
        password: password.value,
      }),
    );
  };

  if (auth || signIn.data) {
    return <Redirect to="/" />;
  }

  return (
    <Root>
      <MainNavbar />
      <Container>
        <SignForm onSubmit={handleSignIn}>
          <FormGroup label="Username or Email">
            <IconInput>
              <UserIcon size={20} />
              <Input type="text" {...login} />
            </IconInput>
          </FormGroup>
          <FormGroup label="Password">
            <IconInput>
              <LockIcon size={20} />
              <Input type="password" {...password} />
            </IconInput>
          </FormGroup>
          <Button
            fullWidth
            color="primary"
            type="submit"
            loading={signIn.loading}
            disabled={blank}
            onClick={handleSignIn}
          >
            Login
          </Button>
          <GuestLayout>
            Don't have an account?
            <Strong as={Link} to="/sign-up" underline>
              Join Now!
            </Strong>
          </GuestLayout>
          <Link to="/forgot-password" underline>
            Forgot Password?
          </Link>
          {signIn.error && <FormError error={signIn.error} />}
        </SignForm>
      </Container>
    </Root>
  );
};

export default SignInPage;
