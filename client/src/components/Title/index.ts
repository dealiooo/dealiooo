import styled from 'styled-components';

import { constants, Color } from '../../styles';

const { spaces } = constants;

type TitleProps = {
  color?: Color | string;
  marginless?: boolean;
};

const Title = styled.div<TitleProps>`
  color: ${({ theme, color }) => theme.palette[color] || color || 'currentColor'};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ marginless }) => (marginless ? 0 : spaces.xl)};
`;

export default Title;
