import React from 'react';
import styled from 'styled-components';
import sumBy from 'lodash/sumBy';
import { Home as HomeIcon } from 'styled-icons/octicons/Home';
import { Building as BuildingIcon } from 'styled-icons/boxicons-regular/Building';
import { stripUnit } from 'polished';
import { Stack as DeckIcon } from 'styled-icons/remix-fill/Stack';
import { HandPaper as HandIcon } from 'styled-icons/fa-solid/HandPaper';

import { CenterInline, Strong, Tooltip } from '../../../atoms';
import { space, borderSize, px, useTheme } from '../../../../styles';
import { BorderCircle, scaleFontSize, Circle } from '../Cards';
import { Player } from '../../../../types/dealiooo';
import { Detail } from '../CardDetails';
import { TOOLTIP_DELAY } from '../utils';

type TopBarProps = {
  player: Player;
  height: number;
};

export const BAR_PADDING = space.small;
const STROKE_WIDTH = stripUnit(borderSize.normal);

const TopBarInfo = ({ player, height }: TopBarProps) => {
  const theme = useTheme();
  const totalMoney = sumBy(player.bankCards, c => c.value);
  const circleSize = height - 2 * px(BAR_PADDING);
  const iconSize = circleSize / 3;

  const { houseFrequency, hotelFrequency } = player.buildingCards.reduce(
    (buildingFrequencies, buildingCard) => {
      if (buildingCard.name === 'house') {
        return {
          houseFrequency: buildingFrequencies.houseFrequency++,
          hotelFrequency: buildingFrequencies.hotelFrequency,
        };
      }

      if (buildingCard.name === 'hotel') {
        return {
          houseFrequency: buildingFrequencies.houseFrequency,
          hotelFrequency: buildingFrequencies.hotelFrequency++,
        };
      }

      return buildingFrequencies;
    },
    { houseFrequency: 0, hotelFrequency: 0 },
  );

  return (
    <TopBar height={height}>
      <Strong>{player.username}</Strong>
      <StatCircles style={{ fontSize: `${scaleFontSize(circleSize)}px` }}>
        {typeof player.handCards === 'number' && (
          <Tooltip
            placement="bottom"
            trigger="hover"
            delayShow={TOOLTIP_DELAY}
            tooltip={<Detail detail="number of hand cards" />}
          >
            <BorderCircle size={circleSize} strokeWidth={STROKE_WIDTH} color={theme.success}>
              <div style={{ color: theme.success }}>
                <HandIcon size={iconSize} />
                <CenterInline>{player.handCards}</CenterInline>
              </div>
            </BorderCircle>
          </Tooltip>
        )}
        <Tooltip
          placement="bottom"
          trigger="hover"
          delayShow={TOOLTIP_DELAY}
          tooltip={<Detail detail="money in the bank" />}
        >
          <BorderCircle size={circleSize} strokeWidth={STROKE_WIDTH} color={theme.gold}>
            <div style={{ color: theme.gold }}>{`$${totalMoney}`}</div>
          </BorderCircle>
        </Tooltip>
        <Tooltip
          placement="bottom"
          trigger="hover"
          delayShow={TOOLTIP_DELAY}
          tooltip={<Detail detail="number of house cards" />}
        >
          <BorderCircle size={circleSize} strokeWidth={STROKE_WIDTH}>
            <div>
              <HomeIcon size={iconSize} />
              <CenterInline>{houseFrequency}</CenterInline>
            </div>
          </BorderCircle>
        </Tooltip>
        <Tooltip
          placement="bottom"
          trigger="hover"
          delayShow={TOOLTIP_DELAY}
          tooltip={<Detail detail="number of hotel cards" />}
        >
          <BorderCircle size={circleSize} strokeWidth={STROKE_WIDTH}>
            <div>
              <BuildingIcon size={iconSize} />
              <CenterInline>{hotelFrequency}</CenterInline>
            </div>
          </BorderCircle>
        </Tooltip>
      </StatCircles>
    </TopBar>
  );
};

export const TopBar = styled.div<{ height: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: ${({ height }) => height}px;
  padding: ${BAR_PADDING};
  border-bottom: ${borderSize.thin} solid ${({ theme }) => theme.outline};
`;

const StatCircles = styled.div`
  display: flex;

  > .trigger {
    cursor: pointer;

    &:hover > ${Circle} {
      background-color: ${({ theme }) => theme.backgroundLighter};
    }
  }

  > .trigger + .trigger {
    margin-left: ${space.small};
  }
`;

export default TopBarInfo;
