import React from 'react';
import { match } from 'react-router';

import { Root } from '../layouts';
import Game from '../sections/Game';

type GamePageProps = {
  match: match<{ gameId: string }>;
};

const GamePage: React.FC<GamePageProps> = ({ match }) => {
  const gameId = parseInt(match.params.gameId, 10);

  return (
    <Root>
      <Game gameId={gameId} />
    </Root>
  );
};

export default GamePage;
