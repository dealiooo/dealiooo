import React from 'react';
import { match } from 'react-router';

import { Root } from '../components/layouts';
import Game from '../components/organisms/Game';

type Props = {
  match: match<{ gameId: string }>;
};

export default function({ match }: Props) {
  const gameId = parseInt(match.params.gameId, 10);

  return (
    <Root>
      <Game gameId={gameId} />
    </Root>
  );
}
