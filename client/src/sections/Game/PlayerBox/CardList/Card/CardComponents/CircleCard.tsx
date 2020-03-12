import React from 'react';

import { CardBase, CardBaseProps } from './style';
import { BorderCircle, BorderCircleProps } from '../../../style';

type CircleCardProps = CardBaseProps & BorderCircleProps & { name: string };

const CircleCard: React.FC<CircleCardProps> = ({ name, ...rest }) => (
  <CardBase {...rest}>
    <BorderCircle size={rest.height / 2} {...rest}>
      <div>{name}</div>
    </BorderCircle>
  </CardBase>
);

export default CircleCard;
