import React from 'react';
import { startCase, capitalize } from 'lodash';

import RentValueDetail from './RentValueDetail';
import { Circle, BorderCircle } from '../../../style';
import { CenterInline, Strong } from '../../../../../../components';
import * as S from './style';
import { CardType } from '../../../../../../types';

const renderByType = ({ type, rentValues, color, colors }) => {
  if (type === 'rent') {
    return (
      <S.BorderCircles>
        {colors.map(color => (
          <BorderCircle key={color} color={color} size={80}>
            <Strong>{capitalize(color)}</Strong>
          </BorderCircle>
        ))}
      </S.BorderCircles>
    );
  }

  if (type === 'property' || (type === 'property_wildcard' && colors.length === 2)) {
    return (
      <S.RentValueDetails>
        {rentValues.map((rentValue, index) => (
          <RentValueDetail key={rentValue} color={color || colors[index]} rentValues={rentValue} />
        ))}
      </S.RentValueDetails>
    );
  }

  return null;
};

type CardDetailProps = {
  name: string;
  money: number;
  type: CardType;
  description?: string;
  Icon?;
  hideValue?: boolean;
};

const CardDetail: React.FC<CardDetailProps> = props => {
  const { name, money, type, description, hideValue, Icon } = props;

  return (
    <S.Container>
      <S.TopBar>
        <S.Header>
          {Icon && (
            <Circle size={50}>
              <Icon size={30} />
            </Circle>
          )}
          <Strong as={CenterInline}>{name}</Strong>
        </S.Header>
        {!hideValue && (
          <BorderCircle size={40}>
            <Strong>{`$${money}`}</Strong>
          </BorderCircle>
        )}
      </S.TopBar>
      <S.Content>
        <S.Type>{startCase(type)}</S.Type>
        {description && <S.Description>{description}</S.Description>}
        {renderByType(props)}
      </S.Content>
    </S.Container>
  );
};

export default CardDetail;
