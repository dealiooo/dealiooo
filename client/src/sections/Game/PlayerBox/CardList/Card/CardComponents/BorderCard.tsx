import React from 'react';

import { CardBase, CardBaseProps } from './style';

type BorderCardProps = CardBaseProps & { name: string };

const BorderCard: React.FC<BorderCardProps> = ({ name, ...rest }) => {
  return (
    <CardBase {...rest}>
      <div>{name}</div>
    </CardBase>
  );
};

export default BorderCard;
