import React from 'react';
import { Loader as LoaderIcon } from 'styled-icons/feather/Loader';

import { IconProps } from '../../atoms';
import { IconWrapper } from './style';

export type Props = Omit<IconProps, 'icon'> & {};

export default function(props: Props) {
  return (
    <IconWrapper>
      <LoaderIcon {...props} />
    </IconWrapper>
  );
}
