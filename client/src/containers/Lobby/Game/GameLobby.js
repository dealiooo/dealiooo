import React, { Component } from 'react';

import Section from 'react-bulma-components/lib/components/section';
import Level from 'react-bulma-components/lib/components/level';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';

import NavigationBar from '../../../components/NavigationBar';
import ChatLog from '../../../components/Chat/ChatLog';
import ChatInput from '../../../components/Chat/ChatInput';
import PlayerStatus from './PlayerStatus';

import api from '../../../api';
import socket from '../../../api/socket';

import './GameLobby.css';

class GameLobby extends Component {
  constructor(props) {
    super(props);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerUnready = this.onPlayerUnready.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onExit = this.onExit.bind(this);
    this.onAddGame = this.onAddGame.bind(this);
    this.onJoinGame = this.onJoinGame.bind(this);
    this.onLeaveGame = this.onLeaveGame.bind(this);
    this.onRunGame = this.onRunGame.bind(this);
    this.state = {
      game_id: this.props.match.params.id,
      lobby_name: `${this.props.match.params.id}'s Lobby`,
      start_render: false,
      user_id: null,
      user_name: null,
      players_status: null,
      socket_leave_game: null,
      socket_run_game: null,
      socket_player_ready: null,
      socket_player_unready: null,
      chat_socket: socket(),
      mainlobby_socket: socket(),
      gamelobby_socket: socket()
    };
  }

  componentDidMount() {
    api.get_game_lobby(this.state.game_id).then(response => {
      if (response.ok) {
        response.text().then(body => {
          body = JSON.parse(body);
          this.setState({ user_id: body.id });
          this.setState({ user_name: body.name });
          this.setState({ start_render: true });
          api.get_game_lobby_player_status(this.state.game_id).then(status => {
            status.result.map(
              player_status =>
                (player_status.ready = player_status.Players[0].ready)
            );
            this.setState({ players_status: status.result });
            var m_temp = this.state.mainlobby_socket.register_mainlobby_handler(
              {
                on_add_game: this.onAddGame,
                on_join_game: this.onJoinGame,
                on_leave_game: this.onLeaveGame,
                on_run_game: this.onRunGame
              }
            );
            this.setState({
              socket_leave_game: m_temp.leave_game,
              socket_run_game: m_temp.run_game
            });
            var g_temp = this.state.gamelobby_socket.register_gamelobby_handler(
              {
                on_player_ready: this.onPlayerReady,
                on_player_unready: this.onPlayerUnready
              }
            );
            g_temp.join(
              {
                room_id: `gamelobby/${this.state.game_id}`,
                user_name: this.state.user_name
              },
              error => {
                if (error) {
                  console.log(error);
                  console.log(`creating room: gamelobby/${this.state.game_id}`);
                  g_temp.add_room(
                    { room_id: `gamelobby/${this.state.game_id}` },
                    error => {
                      if (error) {
                        console.log(error);
                      }
                    }
                  );
                }
              }
            );
            this.setState({
              socket_player_ready: g_temp.player_ready,
              socket_player_unready: g_temp.player_unready
            });
          });
        });
      } else {
        window.location = '/main-lobby';
      }
    });
  }

  componentWillUnmount() {
    this.state.mainlobby_socket.unregister_mainlobby_handler();
    this.state.gamelobby_socket.unregister_gamelobby_handler();
  }

  onPlayerReady(event) {
    // TODO: refactor this array functionality to a dictionary
    var temp = this.state.players_status;
    var size = temp.length;
    for (var i = 0; i < size; i++) {
      if (temp[i].id === event) {
        temp[i].ready = true;
      }
    }
    this.setState({ player_status: temp });
  }

  onPlayerUnready(event) {
    // TODO: refactor this array functionality to a dictionary
    var temp = this.state.players_status;
    var size = temp.length;
    for (var i = 0; i < size; i++) {
      if (temp[i].id === event) {
        temp[i].ready = false;
      }
    }
    this.setState({ player_status: temp });
  }

  onStart(event) {
    console.log('TODO');
  }

  onReady(event) {
    api.post_player_ready(this.state.game_id).then(ready_state => {
      if (ready_state.result[1].ready) {
        this.state.socket_player_ready(
          {
            room_id: `gamelobby/${this.state.game_id}`,
            user_id: this.state.user_id
          },
          error => {
            if (error) {
              console.log(error);
            }
          }
        );
      } else {
        this.state.socket_player_unready(
          {
            room_id: `gamelobby/${this.state.game_id}`,
            user_id: this.state.user_id
          },
          error => {
            if (error) {
              console.log(error);
            }
          }
        );
      }
    });
  }

  onExit(event) {
    api.post_leave_game(this.state.game_id).then(result => {
      if (!result.status) {
        this.state.socket_leave_game(
          {
            game_id: this.state.game_id,
            user_id: this.state.user_id
          },
          error => {
            if (error) {
              console.log(error);
            } else {
              api
                .post_delete_game(this.state.game_id)
                .then(result => (window.location = '/main-lobby'));
            }
          }
        );
      }
    });
  }

  onAddGame(event) {
    /* No input functionality */
  }

  onJoinGame(event) {
    if (this.state.game_id === event.game_id) {
      api.get_game_lobby_player_status(this.state.game_id).then(status => {
        status.result.map(
          player_status => (player_status.ready = player_status.th_player.ready)
        );
        this.setState({ players_status: status.result });
      });
    }
  }

  onLeaveGame(event) {
    if (this.state.game_id === event.game_id) {
      var temp = this.state.players_status;
      this.setState({
        players_status: temp.filter(
          player_status => player_status.id !== event.user_id
        )
      });
      if (this.state.user_id === event.user_id) {
        api
          .post_delete_game(this.state.game_id)
          .then(result => (window.location = '/main-lobby'));
      }
    }
  }

  onRunGame(event) {
    console.log('TODO');
  }

  render() {
    if (this.state.start_render) {
      return (
        <Box>
          <NavigationBar title={this.state.lobby_name} />
          <Section>
            <Columns>
              <Columns.Column>
                <PlayerStatus status={this.state.players_status} />
                <Level>
                  <Level.Item>
                    <StartButton host={this.props.host} />
                  </Level.Item>
                  <Level.Item>
                    <Button onClick={this.onReady} className="is-large">
                      Ready
                    </Button>
                  </Level.Item>
                  <Level.Item>
                    <Button onClick={this.onExit} className="is-large">
                      Exit
                    </Button>
                  </Level.Item>
                  <Level.Item />
                </Level>
              </Columns.Column>
              <Columns.Column size="5" className="game-lobby-chat">
                <ChatLog
                  room_id={`gamelobby/${this.state.game_id}`}
                  user_id={this.state.user_id}
                  user_name={this.state.user_name}
                  register_handler={
                    this.state.chat_socket.register_chat_handler
                  }
                  unregister_handler={
                    this.state.chat_socket.unregister_chat_handler
                  }
                />
                <ChatInput
                  room_id={`gamelobby/${this.state.game_id}`}
                  user_id={this.state.user_id}
                  user_name={this.state.user_name}
                  register_handler={
                    this.state.chat_socket.register_chat_handler
                  }
                  unregister_handler={
                    this.state.chat_socket.unregister_chat_handler
                  }
                />
              </Columns.Column>
            </Columns>
          </Section>
        </Box>
      );
    }
    return <Box>Loading Page...</Box>;
  }
}

function StartButton(props) {
  if (props.host) {
    return (
      <Button onClick={this.onStart} className="is-large">
        Start
      </Button>
    );
  }
  return <div />;
}

export default GameLobby;
