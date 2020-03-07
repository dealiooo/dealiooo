import React from 'react';

import { CardBase, CardBaseProps } from './style';
import { useTheme } from '../../../../../../utils';

type IconCardProps = CardBaseProps & { Icon };

const IconCard: React.FC<IconCardProps> = ({ Icon, ...rest }) => {
  const theme = useTheme();

  return (
    <CardBase {...rest}>
      <Icon size={rest.height / 4} color={theme.palette[rest.color]} />
    </CardBase>
  );
};
export default IconCard;
