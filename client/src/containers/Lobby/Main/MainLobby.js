import React, { Component } from 'react';
import GameLobbyList from './GameLobbyList';
import ChatLog from '../../../components/Chat/ChatLog';
import ChatInput from '../../../components/Chat/ChatInput';
import NavigationBar from '../../../components/NavigationBar';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import api from '../../../api';
import socket from '../../../api/socket';

import './MainLobby.css';

class MainLobby extends Component {
  constructor(props) {
    super(props);
    this.onAddGame = this.onAddGame.bind(this);
    this.onJoinGame = this.onJoinGame.bind(this);
    this.onLeaveGame = this.onLeaveGame.bind(this);
    this.onRunGame = this.onRunGame.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.state = {
      start_render: false,
      user_id: null,
      user_name: null,
      lobbies: null,
      socket_add_game: null,
      socket_join_game: null,
      chat_socket: socket(),
      lobby_socket: socket()
    };
  }

  componentWillMount() {
    api.get_main_lobby().then(response => {
      if (response.ok) {
        response.text().then(body => {
          body = JSON.parse(body);
          this.setState({ user_id: body.id });
          this.setState({ user_name: body.name });
          this.setState({ start_render: true });
          api.post_main_lobby().then(promise => {
            var baseState = promise.result;
            baseState.map((game, i) =>
              api.get_game_lobby_info(game.id).then(info => {
                baseState[i].playerList = info.result;
                baseState[i].playerNum = info.result.length;
                baseState[i].playerCap = 5;
                this.setState({ lobbies: baseState });
              })
            );
          });
        });
      } else {
        window.location = '/login';
      }
    });
  }

  componentDidMount() {
    var temp = this.state.lobby_socket.register_mainlobby_handler({
      on_add_game: this.onAddGame,
      on_join_game: this.onJoinGame,
      on_leave_game: this.onLeaveGame,
      on_run_game: this.onRunGame
    });
    this.setState({
      socket_add_game: temp.add_game,
      socket_join_game: temp.join_game
    });
  }

  componentWillUnmount() {
    this.state.lobby_socket.unregister_mainlobby_handler();
  }

  onAddGame(event) {
    var baseState = this.state.lobbies;
    var newRoom = {
      id: event.game_id,
      turn: 0,
      playerNum: 1
    };
    api.get_game_lobby_info(event.game_id).then(info => {
      newRoom.playerList = info.result;
      newRoom.playerNum = info.result.length;
      newRoom.playerCap = 5;
      baseState = baseState.concat(newRoom);
      this.setState({ lobbies: baseState });
    });
  }

  onJoinGame(event) {
    // todo: convert this array operation to a dictionary operation
    var length = this.state.lobbies.length;
    var index = 0;
    for (var i = 0; i < length; i++) {
      if (this.state.lobbies[i].id === event.game_id) {
        index = i;
        break;
      }
    }
    api.get_game_lobby_info(event.game_id).then(info => {
      var baseState = this.state.lobbies;
      baseState[index].playerList = info.result;
      baseState[index].playerNum = info.result.length;
      baseState[index].playerCap = 5;
      this.setState({ lobbies: baseState });
    });
  }

  onLeaveGame(event) {
    // todo: convert this array operation to a dictionary operation
    var length = this.state.lobbies.length;
    var index = 0;
    for (var i = 0; i < length; i++) {
      if (this.state.lobbies[i].id === event.game_id) {
        index = i;
        break;
      }
    }
    api.get_game_lobby_info(event.game_id).then(info => {
      var baseState = this.state.lobbies;
      baseState[index].playerList = info.result;
      baseState[index].playerNum = info.result.length;
      baseState[index].playerCap = 5;
      this.setState({ lobbies: baseState });
    });
  }

  onRunGame(event) {
    // todo: convert this array operation to a dictionary operation
    var length = this.state.lobbies.length;
    var index = 0;
    for (var i = 0; i < length; i++) {
      if (this.state.lobbies[i].id === event.game_id) {
        index = i;
        break;
      }
    }
    var baseState = this.state.lobbies;
    baseState.splice(index, 1);
    this.setState({ lobbies: baseState });
  }

  onCreate = evt => {
    api.post_create_game().then(promise => {
      var game_id = promise.game_user.th_game_id;
      this.state.socket_add_game(
        { game_id, user_name: this.state.user_name },
        error => {
          if (error) {
            console.log(error);
          } else {
            window.location = `/game-lobby/${game_id}`;
          }
        }
      );
    });
  };

  render() {
    if (this.state.start_render) {
      return (
        <Box>
          <NavigationBar title="Main Lobby" />
          <Columns>
            <Columns.Column>
              <GameLobbyList
                key="gameLobbies"
                gameLobbies={this.state.lobbies}
                user_id={this.state.user_id}
                socket_join={this.state.socket_join_game}
              />
              <Button onClick={this.onCreate} className="is-large">
                Create
              </Button>
            </Columns.Column>
            <Columns.Column className="main-lobby-chat is-two-fifths">
              <ChatLog
                room_id={'mainlobby'}
                user_id={this.state.user_id}
                user_name={this.state.user_name}
                register_handler={this.state.chat_socket.register_chat_handler}
                unregister_handler={
                  this.state.chat_socket.unregister_chat_handler
                }
              />
              <ChatInput
                room_id={'mainlobby'}
                user_id={this.state.user_id}
                user_name={this.state.user_name}
                register_handler={this.state.chat_socket.register_chat_handler}
                unregister_handler={
                  this.state.chat_socket.unregister_chat_handler
                }
              />
            </Columns.Column>
          </Columns>
        </Box>
      );
    }
    return <Box>Loading Page...</Box>;
  }
}

export default MainLobby;
