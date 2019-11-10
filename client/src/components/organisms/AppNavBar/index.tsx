import React, { Fragment, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import TooltipTrigger from 'react-popper-tooltip';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { DotsHorizontalRounded as MoreIcon } from 'styled-icons/boxicons-regular/DotsHorizontalRounded';

import { Button, Link, Icon, NavLink } from '../../atoms';
import { Navbar, IconButton, Loader } from '../../molecules';
import { borderRadius, space, borderSize } from '../../../styles';
import { withTooltip, withTrigger, FlexColumnCenter } from '../../layouts';
import { selectAuth, selectAuthenticate, signOutAsync, selectSignOut, authenticateAsync } from '../../../store/Account';
import { LinkStyle } from '../../BaseStyles';

const MoreMenuTrigger = props => (
  <IconButton>
    <MoreIcon size={30} />
  </IconButton>
);

const Toggler = styled(IconButton)`
  border-radius: 0;
  height: 100%;
  padding-left: ${space.large};
  padding-right: ${space.large};
`;

const UserMenuTrigger = ({ username }) => <Toggler>{username}</Toggler>;

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
          <TooltipTrigger placement="bottom" trigger="click" tooltip={withTooltip(MoreMenu)}>
            {withTrigger(TriggerWrapper, MoreMenuTrigger)}
          </TooltipTrigger>
          {authenticate.loading ? (
            <Loader size={30} />
          ) : auth ? (
            <TooltipTrigger placement="bottom" trigger="click" tooltip={withTooltip(UserMenu)}>
              {withTrigger(TriggerWrapper, props => (
                <UserMenuTrigger username={auth.username} />
              ))}
            </TooltipTrigger>
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

// TODO: organize this stuff better

const Menu = styled.ul`
  background-color: ${({ theme }) => theme.backgroundLightest};
  border: ${borderSize.normal} solid ${({ theme }) => theme.outline};
  padding: ${space.large} 0;
  border-radius: ${borderRadius.round};
`;

const MenuItem = styled.li`
  padding: ${space.medium};

  text-align: start;
  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
`;

const MoreMenu = props => (
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

const SpanLink = styled.span`
  ${LinkStyle}
`;
