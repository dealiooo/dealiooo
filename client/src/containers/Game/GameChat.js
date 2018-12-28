import React, { Component } from 'react';

import Chat from '../.../../../components/Chat';

import { socket, Game } from './../../api';

class GameChat extends Component {
  render() {
    let gameId = this.props.match.params.id;
    return (
      <div className="gamechat">
        <Chat
          socket={socket}
          channel={`game:${gameId}:chat`}
          roomId={gameId}
          api={Game.postGameChat}
        />
      </div>
    );
  }
}

export default GameChat;
