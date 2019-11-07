import styled, { StyledComponentProps } from 'styled-components';

import { fontSize, fontWeight, space } from '../../../styles';

type TitleProps = {
  marginBottom?: boolean;
} & StyledComponentProps;

export default styled.div<TitleProps>`
  font-size: ${fontSize.xLarge};
  font-weight: ${fontWeight.bold};

  margin-bottom: ${({ marginBottom }) => marginBottom && space.xLarge};
`;
