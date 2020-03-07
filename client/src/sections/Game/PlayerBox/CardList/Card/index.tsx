import React from 'react';

import * as S from './style';
import { Tooltip } from '../../../../../components';
import { Card, CardType } from '../../../../../types';
import { IconCard, BorderCard, CircleColorsCard, CircleCard } from './CardComponents';
import { SizeProps } from '../../style';
import getCardProps from './getCardProps';
import CardDetail from './CardDetail';

const PropertyWildcard = props => {
  const CardComponent = props.colors ? CircleColorsCard : CircleCard;
  return <CardComponent {...props} />;
};

const CardComponentMap: { [key in CardType]: React.FC } = {
  money: CircleCard,
  action: BorderCard,
  building: IconCard,
  property: BorderCard,
  property_wildcard: PropertyWildcard,
  rent: CircleCard,
  rent_wildcard: CircleColorsCard,
};

type DealioooCardProps = {
  card: Card;
  size: SizeProps;
  onCardClick: (event) => void;
};

const DealioooCard: React.FC<DealioooCardProps> = ({ card, size, onCardClick }) => {
  const CardComponent = CardComponentMap[card.type];
  const cardProps = getCardProps(card, size);

  return (
    <Tooltip key={card.id} placement="top" trigger="hover" tooltip={<CardDetail {...cardProps} />} triggerWrapper="li">
      <S.Card key={card.id} cardId={card.id} onClick={onCardClick}>
        <CardComponent {...cardProps} />
      </S.Card>
    </Tooltip>
  );
};

export default DealioooCard;
