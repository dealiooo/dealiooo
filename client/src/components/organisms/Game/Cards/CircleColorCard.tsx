import React from 'react';

import { BorderCircle } from './Core';
import CardBase, { CardBaseProps } from './CardBase';

type CircleColorCardProps = Omit<CardBaseProps, 'children'> & {
  name: string;
};

const CircleColorCard = ({ width, height, color, name }: CircleColorCardProps) => {
  return (
    <CardBase width={width} height={height} color={color}>
      <BorderCircle size={height / 2} color={color}>
        <div>{name}</div>
      </BorderCircle>
    </CardBase>
  );
};

export default CircleColorCard;
