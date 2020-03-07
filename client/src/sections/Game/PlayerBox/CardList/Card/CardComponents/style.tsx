import styled from 'styled-components';

import { mixins } from '../../../../../../styles';
import { scalefontSizes, scaleStrokeWidth, ColorProps, borderColorFromPalette, SizeProps } from '../../../style';

export type CardBaseProps = SizeProps & (ColorProps | ColorProps[]);

export const CardBase = styled.div<CardBaseProps>`
  ${mixins.flexColCenter};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  font-size: ${props => scalefontSizes(props.height / 2)}px;
  border-width: ${props => scaleStrokeWidth(props.height / 2)}px;
  border-style: solid;
  border-color: ${borderColorFromPalette};
  text-align: center;
`;
