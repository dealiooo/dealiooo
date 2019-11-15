import React from 'react';

import { Root } from '../components/layouts';
import { AppNavBar, MainLobby } from '../components/organisms';

export default function() {
  return (
    <Root>
      <AppNavBar />
      <MainLobby />
    </Root>
  );
}
