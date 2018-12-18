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

import './GameLobby.css';

class GameLobby extends Component {
  constructor(props) {
    super(props);
    this.onEnterGame = this.onEnterGame.bind(this);
    this.onLeaveGame = this.onLeaveGame.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerUnready = this.onPlayerUnready.bind(this);
    this.onStartGame = this.onStartGame.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onExit = this.onExit.bind(this);
    let gameId = this.props.match.params.id;
    this.state = {
      gameId,
      lobbyName: `${gameId}'s Lobby`,
      startRender: false,
      host: null,
      userId: null,
      userName: null,
      playersStatus: null,
      socket: api.socket
    };
    api.socket.on(`game-lobby:${gameId}:enter-game`, this.onEnterGame);
    api.socket.on(`game-lobby:${gameId}:leave-game`, this.onLeaveGame);
    api.socket.on(`game-lobby:${gameId}:player-ready`, this.onPlayerReady);
    api.socket.on(`game-lobby:${gameId}:player-unready`, this.onPlayerUnready);
    api.socket.on(`game-lobby:${gameId}:start-game`, this.onStartGame);
    api.postGameLobbyEnter(gameId);
  }

  componentDidMount() {
    api.getGameLobby(this.state.gameId).then(response => {
      if (response.ok) {
        response.text().then(body => {
          body = JSON.parse(body);
          this.setState({ userId: body.id });
          this.setState({ userName: body.name });
          this.setState({ startRender: true });
          api.getGameLobbyPlayersStatus(this.state.gameId).then(status => {
            status.result.map(
              playerStatus =>
                (playerStatus.ready = playerStatus.Players[0].ready)
            );
            this.setState({ playersStatus: status.result });
          });
        });
      } else {
        window.location = '/main-lobby';
      }
    });
  }

  onEnterGame(event) {
    if (this.state.gameId === event.game_id) {
      api.getGameLobbyPlayersStatus(this.state.gameId).then(status => {
        status.result.map(
          playerStatus => (playerStatus.ready = playerStatus.th_player.ready)
        );
        this.setState({ players_status: status.result });
      });
    }
  }

  onLeaveGame(event) {
    if (this.state.gameId === event.game_id) {
      var temp = this.state.playersStatus;
      this.setState({
        players_status: temp.filter(
          playerstatus => playerstatus.id !== event.user_id
        )
      });
      if (this.state.userId === event.user_id) {
        api
          .post_delete_game(this.state.gameId)
          .then(result => (window.location = '/main-lobby'));
      }
    }
  }

  onPlayerReady(event) {
    // TODO: refactor this array functionality to a dictionary
    var temp = this.state.playersStatus;
    var size = temp.length;
    for (var i = 0; i < size; i++) {
      if (temp[i].id === event.userId) {
        temp[i].ready = true;
      }
    }
    this.setState({ playerStatus: temp });
  }

  onPlayerUnready(event) {
    // TODO: refactor this array functionality to a dictionary
    var temp = this.state.playersStatus;
    var size = temp.length;
    for (var i = 0; i < size; i++) {
      if (temp[i].id === event.userId) {
        temp[i].ready = false;
      }
    }
    this.setState({ playerStatus: temp });
  }

  onStartGame(event) {
    console.log('TODO');
  }

  onStart(event) {
    console.log('TODO');
  }

  onReady(_) {
    api.postGameLobbyTogglePlayerReady(this.state.gameId);
  }

  onExit(_) {
    api
      .postGameLobbyLeave(this.state.gameId)
      .then(_ => (window.location = '/main-lobby'));
  }

  render() {
    if (this.state.startRender) {
      return (
        <Box>
          <NavigationBar title={this.state.lobbyName} />
          <Section>
            <Columns>
              <Columns.Column>
                <PlayerStatus status={this.state.playersStatus} />
              </Columns.Column>
              <Columns.Column>
                <ChatLog
                  socket={this.state.socket}
                  roomId={`game-lobby:${this.state.gameId}:chat`}
                />
              </Columns.Column>
            </Columns>
            <ChatInput roomId={this.state.gameId} api={api.postGameLobbyChat} />
          </Section>
          <Section>
            <Level>
              <Level.Item />
              <Level.Item />
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
