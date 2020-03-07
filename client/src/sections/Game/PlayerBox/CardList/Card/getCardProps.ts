import startCase from 'lodash/startCase';

import { Home as HouseIcon } from 'styled-icons/octicons/Home';
import { Hotel as HotelIcon } from 'styled-icons/remix-fill/Hotel';

import { Card, RentValue } from '../../../../../types';
import { deriveDescriptionFromCard, RentValuesMap, CardColorsMap } from '../../../utils';
import { Color } from '../../../../../styles';

const getColorOrColors = (card: Card): Color | Color[] => {
  if (card.name === 'hotel') {
    return 'brownLight';
  }

  if (card.name === 'house') {
    return 'orange';
  }

  if (card.type === 'action') {
    return 'red';
  }

  if (card.type === 'money') {
    return 'gold';
  }

  if (card.mainColor) {
    return CardColorsMap[card.mainColor];
  }

  return card.colors.map(color => CardColorsMap[color]);
};

const getRentValuesProp = (card: Card): RentValue[] => {
  if (card.type === 'property') {
    return [RentValuesMap[CardColorsMap[card.mainColor]].rentValues];
  }

  if (card.type === 'property_wildcard' && card.colors.length === 2) {
    return card.colors.map(color => RentValuesMap[CardColorsMap[color]].rentValues);
  }

  return [];
};

const getCardProps = (card, size) => {
  const props = {
    name: card.name,
    money: card.value,
    type: card.type,
    description: deriveDescriptionFromCard(card),
    width: size.width,
    height: size.height,
  };

  if (card.type !== 'money') {
    props.name = startCase(card.name);
  }

  if (card.type === 'building') {
    if (card.name === 'hotel') {
      props.Icon = HotelIcon;
    }

    if (card.name === 'house') {
      props.Icon = HouseIcon;
    }
  }

  if (card.type === 'money') {
    props.hideValue = true;
  }

  const colorOrColors = getColorOrColors(card);
  if (typeof colorOrColors === 'string') {
    props.color = colorOrColors;
  } else {
    props.colors = colorOrColors;
  }

  props.rentValues = getRentValuesProp(card);

  return props;
};

export default getCardProps;
