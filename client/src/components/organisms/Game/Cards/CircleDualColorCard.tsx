import React from 'react';

import { DualColorBorderCircle, DualColorBorderCircleBody, SizeProp } from './Core';
import CardBase from './CardBase';

type CircleDualColorCardProps = SizeProp & {
  name: string;
  color1: string;
  color2: string;
};

const CircleDualColorCard = ({ width, height, name, color1, color2 }: CircleDualColorCardProps) => {
  return (
    <CardBase width={width} height={height} color={`${color2} ${color1} ${color2} ${color1}`}>
      <DualColorBorderCircle size={height / 2} color1={color1} color2={color2}>
        <DualColorBorderCircleBody>{name}</DualColorBorderCircleBody>
      </DualColorBorderCircle>
    </CardBase>
  );
};

export default CircleDualColorCard;
