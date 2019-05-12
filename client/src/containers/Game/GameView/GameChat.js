import React from 'react';

import Chat from '../.../../../../components/Chat';
import { socket, Game } from '../../../api';

const GameChat = ({ gameId, contentHeight }) => (
  <Chat
    gameId={gameId}
    api={Game.postGameChat}
    socket={socket}
    channel={`game:${gameId}:chat`}
    roomId={gameId}
    height={contentHeight}
  />
);

export default GameChat;
