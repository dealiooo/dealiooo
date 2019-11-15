import React from 'react';
import { Home as HouseIcon } from 'styled-icons/octicons/Home';
import { Hotel as HotelIcon } from 'styled-icons/remix-line/Hotel';
import ScrollBar from 'react-perfect-scrollbar';
import styled from 'styled-components';
import { startCase } from 'lodash';

import { space, px, CardColorsMap } from '../../../../styles';
import { fromCardHeight, deriveDescriptionFromCard, TOOLTIP_DELAY, RentValuesMap } from '../utils';
import { IconCard, BorderCard, CircleColorCard, CircleColorsCard, CircleDualColorCard, BorderCircle } from '../Cards';
import { CardType } from '../../../../types/dealiooo';
import { Flex } from '../../../layouts';
import { CardDetail, RentValueDetails } from '../CardDetails';
import { Tooltip, Strong } from '../../../atoms';

const CARDS_PER_ROW = 3;
export const CARD_HORIZONTAL_MARGIN = px(space.medium);
export const CARD_VERTICAL_MARGIN = px(space.medium);

const PropertyDualOrPropertyWild = props => {
  if (props.colors) {
    return <CircleColorsCard {...props} />;
  }

  return <CircleDualColorCard {...props} />;
};

const CardRenderMap: { [key in CardType]: React.FC<any> } = {
  money: CircleColorCard,
  action: BorderCard,
  building: IconCard,
  property: BorderCard,
  property_wildcard: PropertyDualOrPropertyWild,
  rent: CircleDualColorCard,
  rent_wildcard: CircleColorsCard,
};

const renderCardDetails = props => {
  // use temp type (until normalize card type)
  const type = props.type;
  props.type = startCase(props.type);

  if (type === 'rent') {
    const { color1, color2 } = props;

    return (
      <CardDetail {...props}>
        <Flex justifyEvenly>
          <BorderCircle color={color1} size={80}>
            <Strong>{color1}</Strong>
          </BorderCircle>
          <BorderCircle color={color2} size={80}>
            <Strong>{color2}</Strong>
          </BorderCircle>
        </Flex>
      </CardDetail>
    );
  }

  if (type === 'property') {
    const { color, rentValues } = props;

    return (
      <CardDetail {...props}>
        <RentValueDetails color={color} rentValues={rentValues} />
      </CardDetail>
    );
  }

  if (type === 'property_wildcard' && !props.colors) {
    const { color1, color2, rentValues1, rentValues2 } = props;

    return (
      <CardDetail {...props}>
        <Flex>
          <RentValueDetails color={color1} rentValues={rentValues1} />
          <RentValueDetails color={color2} rentValues={rentValues2} />
        </Flex>
      </CardDetail>
    );
  }

  return <CardDetail {...props} />;
};

const renderCard = (card, size, onCardClick) => {
  const CardComponent = CardRenderMap[card.type];

  const allProps = (function() {
    const props = {
      name: card.name,
      money: card.value,
      type: card.type,
      description: deriveDescriptionFromCard(card),
      width: size.width,
      height: size.height,
    };

    if (card.type === 'building') {
      if (card.name === 'hotel') {
        props.Icon = HotelIcon;
        // TODO: design color
        props.color = 'brown';
      } else {
        props.Icon = HouseIcon;
        // TODO: design color
        props.color = 'orange';
      }
    }

    if (card.type === 'property') {
      props.color = CardColorsMap[card.mainColor];
      props.rentValues = RentValuesMap[card.mainColor].rentValues;
    }

    if (card.type === 'action') {
      // TODO: design color
      props.color = 'currentColor';
    }

    if (card.type === 'money') {
      // TODO: design color
      props.color = 'gold';
      props.hideValue = true;
    }

    if (card.type === 'rent') {
      props.color1 = CardColorsMap[card.colors[0]];
      props.color2 = CardColorsMap[card.colors[1]];
    }

    if (card.type === 'property_wildcard' && card.colors.length === 2) {
      props.color1 = CardColorsMap[card.colors[0]];
      props.color2 = CardColorsMap[card.colors[1]];
      props.rentValues1 = RentValuesMap[card.colors[0]].rentValues;
      props.rentValues2 = RentValuesMap[card.colors[1]].rentValues;
    }

    if (card.colors.length > 2) {
      props.colors = card.colors.map(color => CardColorsMap[color]);
    }

    // use display name (until normalize card name)
    if (card.type !== 'money') {
      props.name = startCase(card.name);
    }

    return props;
  })();

  return (
    <Tooltip
      key={card.id}
      placement="top"
      trigger="hover"
      delayShow={TOOLTIP_DELAY}
      tooltip={renderCardDetails(allProps)}
      triggerWrapperAs="li"
    >
      <Card key={card.id} cardId={card.id} onClick={onCardClick}>
        <CardComponent {...allProps} />
      </Card>
    </Tooltip>
  );
};

type CardListRendererProps = {
  cards;
  width?: number;
  height: number;
  onCardClick;
};

const CardListRenderer = ({ cards, width, height, onCardClick }: CardListRendererProps) => {
  function getCardWidthAndHeight() {
    const cardHeight = height - 2 * CARD_VERTICAL_MARGIN;
    const cardWidth = fromCardHeight(cardHeight);

    if (width) {
      const maxCardWidth = (width - CARD_HORIZONTAL_MARGIN * (CARDS_PER_ROW + 1)) / CARDS_PER_ROW;

      if (cardWidth > maxCardWidth) {
        const scaleWidth = maxCardWidth / cardWidth;
        return [cardWidth * scaleWidth, cardHeight * scaleWidth];
      }
    }

    return [cardWidth, cardHeight];
  }

  const [cardWidth, cardHeight] = getCardWidthAndHeight();
  const cardSize = { width: cardWidth, height: cardHeight };

  return (
    <ScrollBar
      style={{
        height: `${height}px`,
      }}
    >
      <CardsList
        style={{
          height: `${height}px`,
        }}
      >
        {cards.map(card => {
          if (Array.isArray(card)) return card.map(innerCard => renderCard(innerCard, cardSize, onCardClick));
          return renderCard(card, cardSize, onCardClick);
        })}
      </CardsList>
    </ScrollBar>
  );
};

export default CardListRenderer;

const Card = styled.div.attrs(props => ({
  'data-card-id': props.cardId,
  ...props,
}))``;

const CardsList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  // TODO: might not be necessary once seperate words
  text-align: center;

  margin-top: ${CARD_VERTICAL_MARGIN}px;

  > .trigger {
    cursor: pointer;
  }

  > .trigger + .trigger {
    margin-bottom: ${CARD_VERTICAL_MARGIN}px;
  }

  > .trigger:nth-child(even) {
    margin-left: ${CARD_HORIZONTAL_MARGIN}px;
    margin-right: ${CARD_HORIZONTAL_MARGIN}px;
  }
`;
