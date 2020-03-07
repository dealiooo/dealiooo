import React from 'react';

import { Link, Menu } from '../../components';
import ThemeChangeButton from '../../ThemeChangeButton';

const moreMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/game-rules">Game Rules</Link>
    </Menu.Item>
    <Menu.Item>
      <ThemeChangeButton />
    </Menu.Item>
  </Menu>
);

export default moreMenu;
