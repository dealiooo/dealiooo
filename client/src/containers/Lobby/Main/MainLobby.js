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

var debug = false;

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
    console.log(event);
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
                gameLobbies={getGameLobbies(this.state.lobbies)}
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

function getGameLobbies(val) {
  if (debug) {
    return [
      {
        id: 1000,
        playerNum: 5,
        playerCap: 5,
        playerList: [
          { name: 'zxcqa1' },
          { name: 'zxcqa2' },
          { name: 'zxcqa3' },
          { name: 'zxcqa4' },
          { name: 'zxcqa5' }
        ]
      },
      {
        id: 1001,
        playerNum: 5,
        playerCap: 5,
        playerList: [
          { name: 'zxcqb1' },
          { name: 'zxcqb2' },
          { name: 'zxcqb3' },
          { name: 'zxcqb4' },
          { name: 'zxcqb5' }
        ]
      },
      {
        id: 1002,
        playerNum: 2,
        playerCap: 5,
        playerList: [{ name: 'qwe1' }, { name: 'qwe2' }]
      },
      {
        id: 1003,
        playerNum: 1,
        playerCap: 4,
        playerList: [{ name: 'joinMe' }]
      },
      {
        id: 1004,
        playerNum: 2,
        playerCap: 2,
        playerList: [{ name: 'asd1' }, { name: 'asd2' }]
      },
      {
        id: 1005,
        playerNum: 5,
        playerCap: 5,
        playerList: [
          { name: 'zxc1' },
          { name: 'zxc2' },
          { name: 'zxc3' },
          { name: 'zxc4' },
          { name: 'zxc5' }
        ]
      },
      {
        id: 1006,
        playerNum: 5,
        playerCap: 5,
        playerList: [
          { name: 'zxcq1' },
          { name: 'zxcq2' },
          { name: 'zxcq3' },
          { name: 'zxcq4' },
          { name: 'zxcq5' }
        ]
      }
    ];
  }
  return val;
}

export default MainLobby;
