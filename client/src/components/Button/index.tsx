import React from 'react';
import styled from 'styled-components';

import * as S from './style';
import Loader from '../Loader';
import { IconWrapper } from '../Icon';
import { Color } from '../../styles';
import withForwardedRef from '../withForwardedRef';

export type ButtonProps = {
  element?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  color?: Color;
  fullWidth?: boolean;
  outline?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ element, loading, children, ...props }) => (
  <S.Button as={element} {...props}>
    {loading ? (
      <IconWrapper>
        <Loader />
      </IconWrapper>
    ) : (
      children
    )}
  </S.Button>
);

export default styled(withForwardedRef(Button))``;
