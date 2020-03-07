import styled from 'styled-components';

import { constants } from '../../styles';
import { Link as LinkBase, CenterInline } from '../../components';

const { spaces } = constants;

export const Section = styled.section`
  padding: ${spaces.lg};
`;

export const Link = styled(LinkBase)`
  color: ${({ theme }) => theme.palette.primary};
  visibility: hidden;
  margin-left: ${spaces.xxs};
`;

export const Rule = styled.div`
  &:hover ${Link} {
    visibility: visible;
  }
`;

export const Title = styled(CenterInline)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.palette.primary};
`;

export const Point = styled.li`
  color: ${({ theme }) => theme.palette.textLight};

  &::before {
    content: '•';
    color: ${({ theme }) => theme.palette.primary};
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

export const Points = styled.ul`
  padding: ${spaces.lg} ${spaces.lg} ${spaces.lg} 0;
  line-height: ${({ theme }) => theme.lineHeights.lg};

  & > ${Point} + ${Point} {
    margin-top: ${spaces.lg};
  }
`;
