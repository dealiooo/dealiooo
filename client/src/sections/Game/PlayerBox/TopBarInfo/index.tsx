import React from 'react';
import sumBy from 'lodash/sumBy';

import { Home as HomeIcon } from '@styled-icons/octicons/Home';
import { Building as BuildingIcon } from '@styled-icons/boxicons-regular/Building';
import { HandPaper as HandIcon } from '@styled-icons/fa-solid/HandPaper';

import * as S from './style';
import { BorderCircle } from '../style';
import { Detail } from '../../style';
import { constants, pxcalc } from '../../../../styles';
import { Player, Card } from '../../../../types';
import { Strong, Tooltip, CenterInline } from '../../../../components';
import { stripUnit } from 'polished';

const { borderSizes } = constants;
const STROKE_WIDTH = stripUnit(borderSizes.normal);

type TopBarInfoProps = {
  player: Player;
  height: number;
};
const TopBarInfo: React.FC<TopBarInfoProps> = ({ player, height }) => {
  const totalMoney = sumBy(player.bankCards, (card: Card) => card.value);
  const circleSize = height - 2 * pxcalc(S.BAR_PADDING);
  const iconSize = circleSize / 3;
  const hideHandCards = typeof player.handCards === 'number';
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
    <S.TopBar height={height}>
      <Strong>{player.username}</Strong>
      <S.StatCircles size={circleSize}>
        {hideHandCards && (
          <Tooltip placement="bottom" trigger="hover" tooltip={<Detail>number of hand cards</Detail>}>
            <BorderCircle size={circleSize} strokeWidth={STROKE_WIDTH}>
              <div>
                <HandIcon size={iconSize} />
                <CenterInline>{player.handCards}</CenterInline>
              </div>
            </BorderCircle>
          </Tooltip>
        )}
        <Tooltip placement="bottom" trigger="hover" tooltip={<Detail>amount of cash</Detail>}>
          <BorderCircle size={circleSize} strokeWidth={STROKE_WIDTH} color="gold">
            <S.Money>{`$${totalMoney}`}</S.Money>
          </BorderCircle>
        </Tooltip>
        <Tooltip placement="bottom" trigger="hover" tooltip={<Detail>amount of house cards</Detail>}>
          <BorderCircle size={circleSize} strokeWidth={STROKE_WIDTH}>
            <div>
              <HomeIcon size={iconSize} />
              <CenterInline>{houseFrequency}</CenterInline>
            </div>
          </BorderCircle>
        </Tooltip>
        <Tooltip placement="bottom" trigger="hover" tooltip={<Detail>amount of hotel cards</Detail>}>
          <BorderCircle size={circleSize} strokeWidth={STROKE_WIDTH}>
            <div>
              <BuildingIcon size={iconSize} />
              <CenterInline>{hotelFrequency}</CenterInline>
            </div>
          </BorderCircle>
        </Tooltip>
      </S.StatCircles>
    </S.TopBar>
  );
};

export default TopBarInfo;
