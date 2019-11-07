import React from 'react';

import { IconInput } from './style';

export type Props = {
  hasIconRight?: boolean;
  children: React.ReactNode;
};

export default function({ hasIconRight, children, ...props }: Props) {
  return (
    <IconInput hasIconRight={hasIconRight} {...props}>
      {children}
    </IconInput>
  );
}
