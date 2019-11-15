import React from 'react';

import CardBase from './CardBase';

const BorderCard = ({ width, height, name, color }) => {
  return (
    <CardBase width={width} height={height} color={color}>
      <div>{name}</div>
    </CardBase>
  );
};

export default BorderCard;
