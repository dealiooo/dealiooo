import React from 'react';
import styled from 'styled-components';

import CardList from './CardList';
import TopBarInfo from './TopBarInfo';
import { constants } from '../../../styles';
import { Player } from '../../../types';

const { borderSizes } = constants;

type PlayerBoxProps = {
  player: Player;
  boxHeight: number;
  onCardClick: (event) => void;
  boxWidth?: number;
  fixedWidth?: boolean;
  includeTopBar?: boolean;
};

const PlayerBox = ({ player, boxWidth, boxHeight, onCardClick }: PlayerBoxProps) => {
  const topBarInfoHeight = boxHeight * 0.2;
  const cardListRendererHeight = boxHeight * 0.8;

  return (
    <PlayerBoxContainer height={boxHeight}>
      <TopBarInfo player={player} height={topBarInfoHeight} />
      <CardList
        cards={player.propertyCards}
        width={boxWidth}
        height={cardListRendererHeight}
        onCardClick={onCardClick}
      />
    </PlayerBoxContainer>
  );
};

type PlayerBoxContainerProps = { height: number };
export const PlayerBoxContainer = styled.div<PlayerBoxContainerProps>`
  flex: 1;
  height: ${({ height }) => height}px;
  border-bottom: ${borderSizes.normal} solid ${({ theme }) => theme.palette.outline};
`;

export default styled(PlayerBox)``;
