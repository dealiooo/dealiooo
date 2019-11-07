import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import { StyledComponentProps } from 'styled-components';

import { Button } from './style';
import { Loader } from '../../molecules';
import { IconWrapper } from '../Icon';

export type ButtonProps = ComponentPropsWithoutRef<'button'> &
  StyledComponentProps & {
    fullWidth?: boolean;
    secondary?: boolean;
    outline?: boolean;
    loading?: boolean;
  };

export default forwardRef<HTMLButtonElement, ButtonProps>(({ children, loading, ...props }, ref) => {
  return (
    <Button {...props} ref={ref}>
      {loading ? (
        <IconWrapper>
          <Loader />
        </IconWrapper>
      ) : (
        children
      )}
    </Button>
  );
});
