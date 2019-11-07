import React from 'react';

import { Icon } from './style';

export type IconProps = {
  icon: string;
  color?: string;
  size?: number;
};

export default function({ icon, ...props }: IconProps) {
  const svg = require(`!raw-loader!./icons/${icon}.svg`);
  return <Icon {...props} dangerouslySetInnerHTML={{ __html: svg.default }}></Icon>;
}
