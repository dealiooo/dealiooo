import styled from 'styled-components';
import { transparentize } from 'polished';

import { Input } from '../../../components';
import { remcalc, constants, mixins } from '../../../styles';

const { spaces } = constants;

const optionColor = ({ theme, color }) => theme.palette[color] || color || theme.palette.backgroundLight;

type OptionProps = { optionIndex: number };
export const Option = styled(Input).attrs<OptionProps>(({ optionIndex }) => ({
  'data-option-index': optionIndex,
}))`
  cursor: pointer;
  border: none;
  width: auto;
  min-width: ${remcalc('200px')};

  background-color: ${optionColor};
  &:hover,
  &:focus,
  &:active {
    background-color: ${props => transparentize(0.3, optionColor(props))};
  }
`;

type ContainerProps = {
  column: boolean;
  height: number;
};
export const Container = styled.div<ContainerProps>`
  ${props => (props.column ? mixins.flexColCenter : mixins.flexRowCenter)};
  flex-wrap: wrap;
  height: ${({ height }) => height}px;
  padding: ${spaces.sm};

  & > ${Option} {
    margin: ${spaces.sm};
  }
`;
