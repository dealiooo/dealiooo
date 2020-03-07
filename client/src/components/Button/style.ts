import styled from 'styled-components';

import { ButtonProps } from '.';
import { constants, remcalc, mixins } from '../../styles';
import { transparentize } from 'polished';

const { spaces, borderRadiuses, borderSizes, transition } = constants;

const color = ({ theme, color, outline, disabled }) => {
  if (disabled) {
    return theme.palette.grayLight;
  }

  if (color && outline) {
    return theme.palette[color] || color;
  }

  if (outline) {
    return theme.palette.text;
  }

  return theme.palette.white;
};

const backgroundColor = ({ theme, color, outline, disabled }) => {
  if (disabled) {
    return theme.palette.gray;
  }

  if (outline) {
    return 'transparent';
  }

  return theme.palette[color] || color || theme.palette.black;
};

const actionBorderColor = ({ theme, color, outline, disabled }) => {
  if (disabled) {
    return theme.palette.gray;
  }

  if (outline) {
    return theme.palette[color] || color || transparentize(0.3, theme.palette.outline);
  }

  return 'transparent';
};

const actionBackgroundColor = ({ theme, color, outline, disabled }) => {
  const backgroundColor = theme.palette[color] || color || theme.palette.black;

  if (disabled) {
    return theme.palette.gray;
  }

  if (outline) {
    return transparentize(0.9, backgroundColor);
  }

  return transparentize(0.3, backgroundColor);
};

export const Button = styled.button<ButtonProps>`
  ${mixins.flexRowCenter};
  min-width: ${remcalc('100px')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  color: ${color};
  background-color: ${backgroundColor};
  ${props => (props.outline ? mixins.border : `border: ${borderSizes.normal} solid ${backgroundColor(props)}`)};
  border-radius: ${borderRadiuses.round};
  padding: ${spaces.sm} ${spaces.md};
  outline: 0;
  text-align: center;
  line-height: 1;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: ${transition};

  &:hover,
  &:focus,
  &:active {
    border-color: ${actionBorderColor};
    background-color: ${actionBackgroundColor};
  }
`;
