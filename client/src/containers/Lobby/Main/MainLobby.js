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
    this.onCreateClick = this.onCreateClick.bind(this);
    this.state = {
      start_render: false,
      user_id: null,
      user_name: null,
      lobbies: null,
      socket_add_game: null,
      chat_socket: socket(),
      lobby_socket: socket()
    };
  }

  componentWillMount() {
    api.get_main_lobby().then(response => {
      if (response.ok) {
        api.post_main_lobby().then(promise => {
          this.setState({ lobbies: JSON.parse(promise).result });
          var baseState = this.state.lobbies;
          baseState.map((game, i) =>
            api.get_game_lobby_info(game.id).then(info => {
              baseState[i].playerList = JSON.parse(info).result;
              baseState[i].playerNum = JSON.parse(info).result.length;
              baseState[i].playerCap = 5;
              this.setState({ lobbies: baseState });
            })
          );
        });
        response.text().then(body => {
          body = JSON.parse(body);
          this.setState({ user_id: body.id });
          this.setState({ user_name: body.name });
          this.setState({ start_render: true });
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
      socket_add_game: temp.add_game
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
      newRoom.playerList = JSON.parse(info).result;
      newRoom.playerNum = JSON.parse(info).result.length;
      newRoom.playerCap = 5;
      baseState = baseState.concat(newRoom);
      this.setState({ lobbies: baseState });
    });
  }

  onJoinGame(event) {
    console.log(event);
  }

  onLeaveGame(event) {
    console.log(event);
  }

  onRunGame(event) {
    console.log(event);
  }

  onCreateClick = evt => {
    api.get_create_game().then(response => {
      if (response.ok) {
        response.text().then(promise => {
          var game_id = JSON.parse(promise).game_user.th_game_id;
          this.state.socket_add_game(
            { game_id, user_name: this.state.user_name },
            error => {
              if (error) {
                console.log(error);
              }
            }
          );
          //window.location = `/game-lobby/${room_id}`;
        });
      }
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
              />
              <Button onClick={this.onCreateClick} className="is-large">
                Create
              </Button>
            </Columns.Column>
            <Columns.Column>
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
    } else {
      return <Box>Loading Page...</Box>;
    }
  }
}

export default MainLobby;
