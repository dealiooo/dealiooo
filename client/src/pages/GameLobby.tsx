import React from 'react';

import { Root } from '../components/layouts';
import { AppNavBar, GameLobby } from '../components/organisms';
import { match } from 'react-router';

type Props = {
  match: match<{ gameId: string }>;
};

export default function({ match }: Props) {
  const gameId = parseInt(match.params.gameId, 10);

  return (
    <Root>
      <AppNavBar />
      <GameLobby gameId={gameId} />
    </Root>
  );
}
