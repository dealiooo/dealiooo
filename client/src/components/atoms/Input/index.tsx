import React, { forwardRef, ComponentPropsWithoutRef } from 'react';

import { Input } from './style';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  error?: boolean;
};

export default forwardRef<HTMLInputElement, InputProps>((props, ref) => <Input {...props} ref={ref} />);
