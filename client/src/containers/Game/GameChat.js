import React, { Component } from 'react';

import ChatLog from '../.../../../components/Chat/ChatLog';
import ChatInput from '../.../../../components/Chat/ChatInput';

import socket from '../../api/socket';

class GameChat extends Component {
  constructor(props) {
    super();

    this.state = {
      game_id: props.match.params.id,
      lobby_name: `${props.match.params.id}'s Lobby`,
      start_render: false,
      user_id: null,
      user_name: null,
      players_status: null,
      socket_leave_game: null,
      chat_socket: socket(),
      mainlobby_socket: socket(),
      gamelobby_socket: socket()
    };
  }

  render() {
    return (
      <div className="gamechat">
        <ChatLog
          room_id={`game/${this.state.game_id}`}
          user_id={this.state.user_id}
          user_name={this.state.user_name}
          register_handler={this.state.chat_socket.register_chat_handler}
          unregister_handler={this.state.chat_socket.unregister_chat_handler}
        />
        <ChatInput
          room_id={`game/${this.state.game_id}`}
          user_id={this.state.user_id}
          user_name={this.state.user_name}
          register_handler={this.state.chat_socket.register_chat_handler}
          unregister_handler={this.state.chat_socket.unregister_chat_handler}
        />
      </div>
    );
  }
}

export default GameChat;
