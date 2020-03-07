import React, { useCallback } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './style';
import { Menu } from '../../../components';
import { signOutAsync, selectSignOut } from '../../../store/Account';

const UserMenu: React.FC = props => {
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
      <Menu.Item>
        <S.Logout onClick={handleLogout}>Logout</S.Logout>
      </Menu.Item>
    </Menu>
  );
};

export default UserMenu;
