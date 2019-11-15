import React from 'react';
import styled from 'styled-components';

import CardListRenderer from './CardListRenderer';
import TopBarInfo from './TopBarInfo';
import { Player } from '../../../../types/dealiooo';
import { borderSize } from '../../../../styles';

type PlayerBoxProps = {
  onCardClick;
  player: Player;
  boxWidth?: number;
  boxHeight: number;
  fixedWidth?: boolean;
  includeTopBar?: boolean;
};

const PlayerBox = ({ player, boxWidth = undefined, boxHeight, onCardClick = undefined }: PlayerBoxProps) => {
  const topBarInfoHeight = boxHeight * 0.2;
  const cardListRendererHeight = boxHeight * 0.8;

  return (
    <PlayerBoxContainer height={boxHeight}>
      <TopBarInfo player={player} height={topBarInfoHeight} />
      <CardListRenderer
        cards={player.propertyCards}
        width={boxWidth}
        height={cardListRendererHeight}
        onCardClick={onCardClick}
      />
    </PlayerBoxContainer>
  );
};

export const PlayerBoxContainer = styled.div<{ height: number }>`
  flex: 1;
  height: ${({ height }) => height}px;
  border-bottom: ${borderSize.normal} solid ${({ theme }) => theme.outline};
`;

export default PlayerBox;
