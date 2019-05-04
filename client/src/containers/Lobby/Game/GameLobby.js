import React, { Component } from 'react';

import NavigationBar from '../../../components/NavigationBar';
import Chat from '../../../components/Chat';
import PlayerStatus from './PlayerStatus';

import { socket, GameLobby as GameLobbyAPI } from '../../../api';

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
      host: false,
      userId: null,
      userName: null,
      playersStatus: null,
      socket: socket
    };
    GameLobbyAPI.postGameLobbyEnter(gameId);
    socket.on(`game-lobby:${gameId}:enter-game`, this.onEnterGame);
    socket.on(`game-lobby:${gameId}:leave-game`, this.onLeaveGame);
    socket.on(`game-lobby:${gameId}:player-ready`, this.onPlayerReady);
    socket.on(`game-lobby:${gameId}:player-unready`, this.onPlayerUnready);
    socket.on(`game-lobby:${gameId}:start-game`, this.onStartGame);
  }

  componentDidMount() {
    GameLobbyAPI.getGameLobby(this.state.gameId).then(response => {
      if (response.ok) {
        response.text().then(body => {
          body = JSON.parse(body);
          this.setState({ userId: body.id });
          this.setState({ userName: body.name });
          GameLobbyAPI.getGameLobbyPlayersStatus(this.state.gameId).then(
            status => {
              status.result.map(playerStatus => {
                if (this.state.userId === playerStatus.id) {
                  this.setState({ host: playerStatus.Players[0].host });
                }
                return (playerStatus.ready = playerStatus.Players[0].ready);
              });
              this.setState({ playersStatus: status.result });
              this.setState({ startRender: true });
            }
          );
        });
      } else {
        window.location = '/main-lobby';
      }
    });
    GameLobbyAPI.getGameLobbyInfo(this.state.gameId).then(gameInfo => {
      this.setState({ lobbyName: `${gameInfo.room_name} Lobby` });
    });
  }

  onEnterGame(event) {
    if (this.state.gameId === event) {
      GameLobbyAPI.getGameLobbyPlayersStatus(this.state.gameId).then(status => {
        status.result.map(
          playerStatus => (playerStatus.ready = playerStatus.Players[0].ready)
        );
        this.setState({ players_status: status.result });
      });
    }
  }

  onLeaveGame(event) {
    if (this.state.gameId === event.gameId) {
      var temp = this.state.playersStatus;
      this.setState({
        playersStatus: temp.filter(
          playerStatus => playerStatus.id !== event.userId
        )
      });
      if (this.state.userId === event.userId) {
        window.location = '/main-lobby';
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

  onStartGame(_) {
    window.location = `/game/${this.state.gameId}`;
  }

  onStart(_) {
    GameLobbyAPI.postGameLobbyStart(this.state.gameId).then(result => {
      if (result.message) {
      }
    });
  }

  onReady(_) {
    GameLobbyAPI.postGameLobbyTogglePlayerReady(this.state.gameId).then(
      result => {}
    );
  }

  onExit(_) {
    GameLobbyAPI.postGameLobbyLeave(this.state.gameId).then(
      _ => (window.location = '/main-lobby')
    );
  }

  render() {
    if (this.state.startRender) {
      return (
        <>
          <NavigationBar userName={this.state.userName} />
          <div className="columns">
            <div className="column">
              <div className="container">
                <section className="section">
                  <div className="columns">
                    <div className="column is-three-fifths left-border">
                      <div className="box room-name-header">
                        <h1 className="title has-text-white">
                          {this.state.lobbyName}
                        </h1>
                      </div>
                      <section className="section left-mid-section">
                        <PlayerStatus status={this.state.playersStatus} />
                      </section>
                      <section className="section">
                        <div className="level">
                          <div className="level-item">
                            {this.state.host ? (
                              <button
                                className="button is-medium is-fullwidth"
                                onClick={this.onStart}
                              >
                                Start
                              </button>
                            ) : (
                              <div />
                            )}
                          </div>
                          <div className="level-item">
                            <button
                              className="button is-medium is-fullwidth is-success"
                              onClick={this.onReady}
                            >
                              Ready
                            </button>
                          </div>
                          <div className="level-item">
                            <button
                              className="button is-medium is-fullwidth is-danger"
                              onClick={this.onExit}
                            >
                              Exit
                            </button>
                          </div>
                        </div>
                      </section>
                    </div>
                    <div className="column game-lobby-chat">
                      <Chat
                        socket={this.state.socket}
                        api={GameLobbyAPI.postGameLobbyChat}
                        channel={`game-lobby:${this.state.gameId}:chat`}
                        roomId={this.state.gameId}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      );
    }
    return <>Loading...</>;
  }
}

export default GameLobby;
