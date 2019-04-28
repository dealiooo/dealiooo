import React from 'react';

import Chat from '../.../../../../components/Chat';
import { socket, Game } from '../../../api';

const GameChat = ({ gameId }) => (
  <div className="gameChat">
    <Chat
      api={Game.postGameChat}
      socket={socket}
      channel={`game:${gameId}:chat`}
      roomId={gameId}
    />
  </div>
);

export default GameChat;
