import React, { Component } from 'react';

import ChatLog from '../.../../../components/Chat/ChatLog';
import ChatInput from '../.../../../components/Chat/ChatInput';

import api from './../../api';

class GameChat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let gameId = this.props.match.params.id;
    return (
      <div className="gamechat">
        <ChatLog socket={api.socket} roomId={`game:${gameId}:chat`} />
        <ChatInput roomId={gameId} api={api.postGameChat} />
      </div>
    );
  }
}

export default GameChat;
