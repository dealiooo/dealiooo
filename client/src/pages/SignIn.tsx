import React from 'react';
import styled from 'styled-components';
import { Lock as LockIcon } from 'styled-icons/feather/Lock';
import { User as UserIcon } from 'styled-icons/feather/User';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { Root, Container, SignForm } from '../components/layouts';
import { AppNavBar } from '../components/organisms';
import { Input, Button, Link, FormError } from '../components/atoms';
import { FormGroup, IconInput } from '../components/molecules';
import { space, borderSize } from '../styles';
import { signInAsync, selectSignIn, selectAuth } from '../store/Account';
import { useInputValue, isBlank } from '../utils';

const GuestLayout = styled.div`
  margin-top: ${space.xxxLarge};
  margin-bottom: ${space.medium};

  > a {
    margin-left: ${space.mini};

    &:hover {
      border-color: ${({ theme }) => theme.primary};
    }
  }
`;

export default function() {
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
      <AppNavBar />
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
          <Button fullWidth type="submit" loading={signIn.loading} disabled={blank} onClick={handleSignIn}>
            Login
          </Button>
          <GuestLayout>
            Don't have an account?
            <Link to="/sign-up" underlineOnHover>
              Join Now!
            </Link>
          </GuestLayout>
          <Link to="/forgot-password">Forgot Password?</Link>
          {signIn.error && <FormError error={signIn.error} />}
        </SignForm>
      </Container>
    </Root>
  );
}
