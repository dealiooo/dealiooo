import styled, { StyledComponentProps } from 'styled-components';

import { space, fontWeight, borderRadius } from '../../../styles';

type AttributeProps = StyledComponentProps & {
  pill?: boolean;
};

export default styled.div<AttributeProps>`
  display: inline-block;

  padding: ${space.small} ${space.large};
  border-radius: ${({ pill }) => (pill ? borderRadius.full : borderRadius.round)};
  background-color: ${({ theme }) => theme.backgroundDark};
  font-weight: ${fontWeight.bold};
`;
