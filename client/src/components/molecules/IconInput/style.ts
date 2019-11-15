import styled from 'styled-components';

import { IconWrapper } from '../../atoms/Icon';
import { Input } from '../../atoms/Input/style';
import { IconButton } from '../../molecules';
import { Props } from '.';
import { space, borderSize } from '../../../styles';

export const IconInput = styled.div<Props>`
  display: flex;
  align-items: center;

  position: relative;
  & > ${Input} {
    padding-left: ${({ hasIconRight }) => (hasIconRight ? '12px' : '36px')};
    padding-right: ${({ hasIconRight }) => (hasIconRight ? '36px' : '12px')};
  }

  & > svg,
  & > ${IconWrapper}, & > ${IconButton} {
    position: absolute;
    height: 100%;

    ${({ hasIconRight }) => {
      const direction = hasIconRight ? 'right' : 'left';
      return `${direction}: 12px`;
    }};
  }

  & > ${IconButton} {
    // Subtract height from icon button padding
    height: calc(100% - ${space.small} / 2);

    ${({ hasIconRight }) => {
      const direction = hasIconRight ? 'right' : 'left';
      // Subtract direction from icon button padding
      return `${direction}: calc(12px - ${space.small})`;
    }};
  }
`;
