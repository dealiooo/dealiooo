import React from 'react';
import { Stack as DeckIcon } from 'styled-icons/remix-fill/Stack';
import { Skull as DiscardIcon } from 'styled-icons/boxicons-solid/Skull';
import { Refresh as TurnsIcon } from 'styled-icons/remix-line/Refresh';
import styled from 'styled-components';

import { CenterInline, Strong, Tooltip } from '../../../atoms';
import { GameGlobalsBarContainer, TurnTime, TurnMessage, RightContent } from './style';
import { GameGlobals } from '../../../../types/dealiooo';
import { FlexRowCenter } from '../../../layouts';
import { Detail } from '../CardDetails';
import { space, useTheme } from '../../../../styles';
import { TOOLTIP_DELAY } from '../utils';
import { Circle, BorderCircle } from '../Cards';

type Props = {
  gameGlobals: GameGlobals;
  turnMessage: string;
  height: number;
};

const TriggerWrapper = styled.span`
  height: 100%;
`;

const GameGlobalsBar = ({ gameGlobals, turnMessage, height }: Props) => {
  const theme = useTheme();
  return (
    <GameGlobalsBarContainer justifyBetween alignCenter height={height}>
      <BorderCircle size={50} color={theme.gold}>
        <TurnTime>{`${gameGlobals.tick}s`}</TurnTime>
      </BorderCircle>
      <TurnMessage>{turnMessage} </TurnMessage>
      <RightContent>
        <Tooltip
          placement="bottom"
          trigger="hover"
          delayShow={TOOLTIP_DELAY}
          tooltip={<Detail detail="number of cards in deck" />}
          triggerWrapperAs={TriggerWrapper}
        >
          <Deck>
            <DeckIcon size={20} />
            <Strong as={CenterInline}>{gameGlobals.deckCount}</Strong>
          </Deck>
        </Tooltip>
        <Tooltip
          placement="bottom"
          trigger="hover"
          delayShow={TOOLTIP_DELAY}
          tooltip={<Detail detail="number of cards in discard pile" />}
          triggerWrapperAs={TriggerWrapper}
        >
          <Discard>
            <DiscardIcon size={20} />
            <Strong as={CenterInline}>{gameGlobals.discard.length}</Strong>
          </Discard>
        </Tooltip>
        <Tooltip
          placement="bottom"
          trigger="hover"
          delayShow={TOOLTIP_DELAY}
          tooltip={<Detail detail="total number of turns" />}
          triggerWrapperAs={TriggerWrapper}
        >
          <TurnCount>
            <TurnsIcon size={20} />
            <Strong as={CenterInline}>{gameGlobals.turnCount}</Strong>
          </TurnCount>
        </Tooltip>
      </RightContent>
    </GameGlobalsBarContainer>
  );
};

const BaseSection = styled(FlexRowCenter)`
  height: 100%;
  cursor: pointer;
  padding-left: ${space.small};
  padding-right: ${space.small};
`;

const Deck = styled(BaseSection)`
  color: ${({ theme }) => theme.success};
  &:hover {
    background-color: ${({ theme }) => theme.successAccent};
  }
`;

const Discard = styled(BaseSection)`
  color: ${({ theme }) => theme.error};
  &:hover {
    background-color: ${({ theme }) => theme.errorAccent};
  }
`;

const TurnCount = styled(BaseSection)`
  color: ${({ theme }) => theme.info};
  &:hover {
    background-color: ${({ theme }) => theme.infoAccent};
  }
`;

export default GameGlobalsBar;
