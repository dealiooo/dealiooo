import React, { Fragment, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { DotsHorizontalRounded as MoreIcon } from 'styled-icons/boxicons-regular/DotsHorizontalRounded';

import { Button, Link, Icon, NavLink, SpanLink, Tooltip } from '../../atoms';
import { Menu, MenuItem } from './style';
import { Navbar, IconButton, Loader } from '../../molecules';
import { space, borderSize } from '../../../styles';
import { FlexColumnCenter } from '../../layouts';
import { selectAuth, selectAuthenticate, signOutAsync, selectSignOut, authenticateAsync } from '../../../store/Account';

const Toggler = styled(IconButton)`
  border-radius: 0;
  padding-left: ${space.large};
  padding-right: ${space.large};
`;

const TriggerWrapper = styled(FlexColumnCenter)`
  height: 100%;
`;

export default function() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const authenticate = useSelector(selectAuthenticate);

  useEffect(() => {
    if (!auth && !authenticate.error) {
      dispatch(authenticateAsync.request());
    }
  }, []);

  return (
    <NavbarRoot>
      <NavLink to="/">
        <Icon icon="logo" />
      </NavLink>
      <Navbar.Menu>
        <Navbar.End>
          <Tooltip placement="bottom" trigger="click" tooltip={MoreMenu} triggerWrapperAs={TriggerWrapper}>
            <IconButton>
              <MoreIcon size={30} />
            </IconButton>
          </Tooltip>
          {authenticate.loading ? (
            <Loader size={30} />
          ) : auth ? (
            <Tooltip placement="bottom" trigger="click" tooltip={<UserMenu />} triggerWrapperAs={TriggerWrapper}>
              <Toggler>{auth.username}</Toggler>
            </Tooltip>
          ) : (
            <Fragment>
              <Button outline as={Link} to="/sign-in">
                Login
              </Button>
              <Button as={Link} to="/sign-up">
                Sign Up
              </Button>
            </Fragment>
          )}
        </Navbar.End>
      </Navbar.Menu>
    </NavbarRoot>
  );
}

const NavbarRoot = styled(Navbar.Root)`
  background-color: ${({ theme }) => theme.backgroundLightest};
  border-bottom: ${borderSize.normal} solid ${({ theme }) => theme.outline};
`;

const MoreMenu = (
  <Menu>
    <MenuItem>
      <Link to="/game-rules">Game Rules</Link>
    </MenuItem>
  </Menu>
);

const UserMenu = props => {
  const dispatch = useDispatch();
  const signOut = useSelector(selectSignOut);
  const handleLogout = useCallback(event => {
    dispatch(signOutAsync.request());
  }, []);

  if (signOut.data) {
    return <Redirect to="/" />;
  }

  return (
    <Menu>
      <MenuItem>
        <SpanLink onClick={handleLogout}>Logout</SpanLink>
      </MenuItem>
    </Menu>
  );
};
