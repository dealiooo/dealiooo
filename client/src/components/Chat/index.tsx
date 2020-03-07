import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Send as SendIcon } from 'styled-icons/boxicons-solid/Send';
import styled from 'styled-components';

import * as S from './style';
import { Input, IconInput, IconButton } from '..';
import { isDirty } from '../../utils';
import { MessageData } from '../../types';
import { socket } from '../../services';

type ChatProps = {
  channel: string;
  onSend: (message: string) => void;
  messages?: MessageData[];
  disabled?: boolean;
  className?: string;
};

const Chat: React.FC<ChatProps> = props => {
  const scrollBarRef = useRef(null);
  const scrollBarContainerRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageData[]>(props.messages || []);
  const dirty = isDirty(message);
  const handleMessageChange = event => setMessage(event.currentTarget.value);
  const handleSendMessage = event => {
    event.preventDefault();
    props.onSend(message);
    setMessage('');
  };
  const handleKeyDown = event => {
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

  return (
    <S.Container className={props.className}>
      <S.Log ref={scrollBarRef} containerRef={handleContainerRef}>
        {messages.map((message, index) => {
          return (
            <div key={`${message.username}-${message.message}-${index}`}>
              <S.Username>{`${message.username}:`}</S.Username>
              <S.Message>{message.message}</S.Message>
            </div>
          );
        })}
      </S.Log>
      <form onSubmit={handleSendMessage}>
        <IconInput hasIconRight>
          {dirty && (
            <IconButton type="submit" color="blue">
              <SendIcon size={20} />
            </IconButton>
          )}
          <Input
            type="text"
            value={message}
            placeholder={props.disabled ? '' : 'Message'}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            disabled={props.disabled}
          />
        </IconInput>
      </form>
    </S.Container>
  );
};

export default styled(Chat)``;
