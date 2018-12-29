import React, { Component } from 'react';

import ChatLog from '../.../../../components/Chat/ChatLog';
import ChatInput from '../.../../../components/Chat/ChatInput';

import { socket, Game } from './../../api';

class GameChat extends Component {

  render() {
    let gameId = this.props.match.params.id;
    return (
      <div className="gamechat">
        <ChatLog socket={socket} roomId={`game:${gameId}:chat`} />
        <ChatInput roomId={gameId} api={Game.postGameChat} />
      </div>
    );
  }
}

export default GameChat;
