import styled from 'styled-components';

import { Icon } from '../../atoms/Icon/style';
import { Input } from '../../atoms/Input/style';
import { IconButton } from '../../molecules';
import { Props } from '.';

export const IconInput = styled.div<Props>`
  position: relative;

  & > ${Input} {
    padding-left: ${({ hasIconRight }) => (hasIconRight ? '12px' : '36px')};
    padding-right: ${({ hasIconRight }) => (hasIconRight ? '36px' : '12px')};
  }

  & > svg,
  & > ${Icon}, & > ${IconButton} {
    position: absolute;
    top: 10px;
    ${({ hasIconRight }) => {
      const direction = hasIconRight ? 'right' : 'left';
      return `${direction}: 12px`;
    }};
  }
`;
