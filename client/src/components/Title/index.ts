import styled from 'styled-components';

import { constants } from '../../styles';

const { spaces } = constants;

type TitleProps = {
  marginless?: boolean;
};

const Title = styled.div<TitleProps>`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ marginless }) => (marginless ? 0 : spaces.xl)};
`;

export default Title;
