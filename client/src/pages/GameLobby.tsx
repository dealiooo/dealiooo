import React from 'react';
import { match } from 'react-router';

import { Root } from '../layouts';
import { MainNavbar, GameLobby } from '../sections';

type GameLobbyPageProps = {
  match: match<{ gameId: string }>;
};

const GameLobbyPage: React.FC<GameLobbyPageProps> = ({ match }) => {
  const gameId = parseInt(match.params.gameId, 10);

  return (
    <Root>
      <MainNavbar />
      <GameLobby gameId={gameId} />
    </Root>
  );
};

export default GameLobbyPage;
