import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Send as SendIcon } from 'styled-icons/boxicons-solid/Send';
import ScrollBar from 'react-perfect-scrollbar';
import styled from 'styled-components';

import { ChatContainer, ChatLog, ChatLogItem, ChatMessage } from './style';
import { Input, Strong } from '../../atoms';
import { IconInput, IconButton } from '../../molecules';
import { InputChangeEvent, FormEvent, InputKeyboardEvent } from '../../../types/html-events';
import { isDirty } from '../../../utils';
import { MessageData } from '../../../types/dealiooo';
import { socket } from '../../../services';

export * from './style';

type Props = {
  channel: string;
  onSend: (message: string) => void;
  messages?: MessageData[];
  disabledSend?: boolean;
};

export default function(props: Props) {
  const scrollBarRef = useRef(null);
  const scrollBarContainerRef = useRef(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageData[]>(props.messages || []);
  const dirty = isDirty(message);
  const handleMessageChange = (event: InputChangeEvent) => setMessage(event.currentTarget.value);
  const handleKeyDown = (event: InputKeyboardEvent) => {
    if (event.key === 'Enter' && dirty) {
      handleSendMessage(event);
    }
  };

  const handleMessageFromSocket = useCallback(message => {
    setMessages(prevMessages => prevMessages.concat(message));
  }, []);

  const handleContainerRef = useCallback(containerRef => {
    scrollBarContainerRef.current = containerRef;
  }, []);

  useEffect(() => {
    socket.on(props.channel, handleMessageFromSocket);

    return () => {
      socket.off(props.channel);
    };
  }, [props.channel]);

  useEffect(() => {
    if (scrollBarContainerRef && scrollBarContainerRef.current) {
      scrollBarContainerRef.current.scrollTop = scrollBarContainerRef.current.scrollHeight;
    }

    if (scrollBarRef && scrollBarRef.current) {
      scrollBarRef.current.updateScroll();
    }
  }, [messages]);

  const handleSendMessage = (event: FormEvent | InputKeyboardEvent) => {
    event.preventDefault();
    props.onSend(message);
    setMessage('');
  };

  return (
    <ChatContainer>
      <ChatLog>
        <ScrollBar ref={scrollBarRef} containerRef={handleContainerRef}>
          {messages.map((message, index) => {
            return (
              <ChatLogItem key={`${message.username}-${message.message}-${index}`}>
                <Strong as="span">{`${message.username}:`}</Strong>
                <ChatMessage>{message.message}</ChatMessage>
              </ChatLogItem>
            );
          })}
        </ScrollBar>
      </ChatLog>
      <form onSubmit={handleSendMessage}>
        <IconInput hasIconRight>
          {dirty && (
            <SendButton type="submit">
              <SendIcon size={20} />
            </SendButton>
          )}
          <Input
            type="text"
            value={message}
            placeholder="Message"
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            disabled={props.disabledSend}
          />
        </IconInput>
      </form>
    </ChatContainer>
  );
}

const SendButton = styled(IconButton)`
  &:hover {
    background-color: ${({ theme }) => theme.backgroundLightest};
  }
`;
