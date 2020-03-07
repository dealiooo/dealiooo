import React from 'react';

import Card from './Card';
import * as S from './style';
import { pxcalc } from '../../../../styles';
import { fromCardHeight } from '../../utils';
import { ScrollBar } from '../../../../components';

const CARDS_PER_ROW = 3;

type CardListProps = {
  cards;
  width?: number;
  height: number;
  onCardClick;
};

const CardList: React.FC<CardListProps> = ({ cards, width, height, onCardClick }) => {
  const getCardWidthAndHeight = () => {
    const cardHeight = height - 2 * pxcalc(S.CARD_VERTICAL_SPACE);
    const cardWidth = fromCardHeight(cardHeight);

    if (width) {
      const maxCardWidth = (width - pxcalc(S.CARD_HORIZONTAL_SPACE) * (CARDS_PER_ROW + 1)) / CARDS_PER_ROW;

      if (cardWidth > maxCardWidth) {
        const scaleWidth = maxCardWidth / cardWidth;
        return [cardWidth * scaleWidth, cardHeight * scaleWidth];
      }
    }

    return [cardWidth, cardHeight];
  };

  const [cardWidth, cardHeight] = getCardWidthAndHeight();
  const cardSize = { width: cardWidth, height: cardHeight };

  return (
    <ScrollBar style={{ height: `${height}px` }}>
      <S.CardList height={height}>
        {cards.map(card => {
          if (Array.isArray(card)) {
            return card.map(card => <Card key={card.id} card={card} size={cardSize} onCardClick={onCardClick} />);
          }

          return <Card key={card.id} card={card} size={cardSize} onCardClick={onCardClick} />;
        })}
      </S.CardList>
    </ScrollBar>
  );
};

export default CardList;
