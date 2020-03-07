import styled from 'styled-components';

import { constants, mixins } from '../../styles';
import { ScrollBar } from '../../components';

const { spaces } = constants;

export const Header = styled.div`
  ${mixins.flexRowCenter};
  justify-content: space-between;
  margin-bottom: ${spaces.md};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > ${ScrollBar}, & > ${Header} {
    padding-right: ${spaces.md};
  }
`;
