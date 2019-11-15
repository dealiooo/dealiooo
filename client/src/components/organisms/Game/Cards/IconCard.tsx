import React from 'react';

import CardBase, { CardBaseProps } from './CardBase';

type IconCardProps = Omit<CardBaseProps, 'children'> & {
  Icon;
};

const IconCard = ({ width, height, color, Icon }: IconCardProps) => {
  return (
    <CardBase width={width} height={height} color={color}>
      <Icon size={height / 4} color={color} />
    </CardBase>
  );
};

export default IconCard;
