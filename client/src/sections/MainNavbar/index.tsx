import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DotsHorizontalRounded as MoreIcon } from '@styled-icons/boxicons-regular/DotsHorizontalRounded';

import UserMenu from './UserMenu';
import moreMenu from './moreMenu';
import { Button, Link, Icon, NavLink, Tooltip, IconButton, Loader } from '../../components';
import { selectAuth, selectAuthenticate, authenticateAsync } from '../../store/Account';
import { Navbar, Toggler, TriggerWrapper } from './style';

const MainNavbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const authenticate = useSelector(selectAuthenticate);

  useEffect(() => {
    if (!auth && !authenticate.error) {
      dispatch(authenticateAsync.request());
    }
  }, []);

  return (
    <Navbar>
      <NavLink to="/">
        <Icon icon="logo" />
      </NavLink>
      <Navbar.Menu>
        <Navbar.End>
          <Tooltip placement="bottom" trigger="click" tooltip={moreMenu} triggerWrapper={TriggerWrapper}>
            <IconButton>
              <MoreIcon size={20} />
            </IconButton>
          </Tooltip>
          {authenticate.loading ? (
            <Loader size={20} />
          ) : auth ? (
            <Tooltip placement="bottom" trigger="click" tooltip={<UserMenu />} triggerWrapper={TriggerWrapper}>
              <Toggler>{auth.username}</Toggler>
            </Tooltip>
          ) : (
            <>
              <Button element={Link} to="/sign-in" outline>
                Login
              </Button>
              <Button element={Link} to="/sign-up" color="primary">
                Sign Up
              </Button>
            </>
          )}
        </Navbar.End>
      </Navbar.Menu>
    </Navbar>
  );
};

export default MainNavbar;
