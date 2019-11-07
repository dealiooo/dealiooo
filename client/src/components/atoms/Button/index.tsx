import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import { StyledComponentProps } from 'styled-components';

import { Button } from './style';

export type ButtonProps = ComponentPropsWithoutRef<'button'> &
  StyledComponentProps & {
    fullWidth?: boolean;
    secondary?: boolean;
    outline?: boolean;
    // TODO: loading spinner state
    loading?: boolean;
  };

export default forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => <Button {...props} ref={ref} />);
