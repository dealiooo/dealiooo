import styled from 'styled-components';

import { Icon, Input, IconButton } from '..';
import { constants } from '../../styles';

const { spaces } = constants;

type IconInputProps = {
  hasIconRight?: boolean;
};

const IconInput = styled.div<IconInputProps>`
  position: relative;
  display: flex;
  align-items: center;

  & > ${Input} {
    padding-left: ${({ hasIconRight }) => (hasIconRight ? '12px' : '36px')};
    padding-right: ${({ hasIconRight }) => (hasIconRight ? '36px' : '12px')};
  }
  & > svg,
  & > ${Icon}, & > ${IconButton} {
    position: absolute;

    ${({ hasIconRight }) => {
      const direction = hasIconRight ? 'right' : 'left';
      return `${direction}: 12px`;
    }};
  }

  & > ${IconButton} {
    &:hover,
    &:focus,
    &:active {
      background-color: ${({ theme }) => theme.palette.backgroundLightest};
    }
    & ~ ${Input} {
      ${({ hasIconRight }) => {
        const direction = hasIconRight ? 'right' : 'left';
        return `padding-${direction}: calc(36px + ${spaces.xxs})`;
      }};
    }

    padding: ${spaces.xxs};
    ${({ hasIconRight }) => {
      const direction = hasIconRight ? 'right' : 'left';
      return `${direction}: calc(12px - ${spaces.xxs})`;
    }};
  }
`;

export default IconInput;
