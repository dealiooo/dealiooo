import React from 'react';
import { Stack as DeckIcon } from '@styled-icons/remix-fill/Stack';
import { Refresh as TurnsIcon } from '@styled-icons/remix-line/Refresh';

import { CenterInline, Strong, Tooltip } from '../../../components';
import { Container, TurnTime, RightContent, Deck, Discard, TurnCount } from './style';
import { GameGlobals } from '../../../types';
import { BorderCircle } from '../PlayerBox/style';
import { Detail } from '../style';

type GlobalsBarProps = {
  gameGlobals: GameGlobals;
  turnMessage: string;
  height: number;
};

const GlobalsBar: React.FC<GlobalsBarProps> = ({ gameGlobals, turnMessage, height }) => (
  <Container height={height}>
    <BorderCircle size={50} color="gold">
      <TurnTime>{`${gameGlobals.tick}s`}</TurnTime>
    </BorderCircle>
    <div>{turnMessage}</div>
    <RightContent>
      <Tooltip placement="bottom" tooltip={<Detail>amount of cards left in deck</Detail>}>
        <Deck>
          <DeckIcon size={20} />
          <Strong as={CenterInline}>{gameGlobals.deckCount}</Strong>
        </Deck>
      </Tooltip>
      <Tooltip placement="bottom" tooltip={<Detail>amount of cards in discard pile</Detail>}>
        <Discard>
          <DeckIcon size={20} />
          <Strong as={CenterInline}>{gameGlobals.discard.length}</Strong>
        </Discard>
      </Tooltip>
      <Tooltip placement="bottom" tooltip={<Detail>total amount of turns</Detail>}>
        <TurnCount>
          <TurnsIcon size={20} />
          <Strong as={CenterInline}>{gameGlobals.turnCount}</Strong>
        </TurnCount>
      </Tooltip>
    </RightContent>
  </Container>
);

export default GlobalsBar;
