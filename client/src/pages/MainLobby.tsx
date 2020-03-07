import React from 'react';

import { Root } from '../layouts';
import { MainNavbar, MainLobby } from '../sections';

const MainLobbyPage: React.FC = props => (
  <Root>
    <MainNavbar />
    <MainLobby />
  </Root>
);

export default MainLobbyPage;
