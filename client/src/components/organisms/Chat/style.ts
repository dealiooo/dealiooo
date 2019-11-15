import styled from 'styled-components';

import { space, lineHeight } from '../../../styles';
import { INPUT_HEIGHT } from '../../atoms/Input/style';
import { IconInput } from '../../molecules/IconInput/style';
import { IconButton } from '../../molecules';
import { Box } from '../../atoms';

const CHAT_PADDING = space.large;

export const ChatLog = styled.div`
  height: calc(100% - ${INPUT_HEIGHT});
  padding-bottom: ${CHAT_PADDING};
`;

export const ChatContainer = styled(Box)`
  padding: ${CHAT_PADDING};
  height: 100%;

  > form {
    & > ${IconInput} {
      & > ${IconButton} {
        color: ${({ theme }) => theme.primary};
      }
    }
  }
`;

export const ChatLogItem = styled.div`
  &:first-child {
    margin-top: 0;
  }
  margin-top: ${space.medium};
  margin-bottom: ${space.medium};
`;

export const ChatMessage = styled.span`
  line-height: ${lineHeight.large};
  margin-left: ${space.medium};
`;
