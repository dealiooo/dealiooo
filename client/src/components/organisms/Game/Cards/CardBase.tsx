import React from 'react';

import { FlexColumnCenter } from '../../../layouts';
import { scaleStrokeWidth, SizeProp, scaleFontSize } from './Core';

export type CardBaseProps = SizeProp & {
  color: string;
  children: React.ReactNode;
};

const CardBase = ({ width, height, color, children }: CardBaseProps) => {
  return (
    <FlexColumnCenter
      style={{
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${scaleFontSize(height / 2)}px`,
        borderStyle: 'solid',
        borderWidth: `${scaleStrokeWidth(height / 2)}px`,
        borderColor: color,
      }}
    >
      {children}
    </FlexColumnCenter>
  );
};

export default CardBase;
