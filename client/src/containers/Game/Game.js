import React, { Component } from 'react';

import './styles/cardColors.css';
import './styles/gameChat.css';

import GameView from './GameView/GameView';
import { socket, Game as GameAPI, GameLobby as GameLobbyAPI } from '../../api';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userName: null,
      gameSocket: socket,
      host: false,
      startGame: false,
      load: true,
      data: null
    };

    this.onStartGame = this.onStartGame.bind(this);
    this.onGameUpdate = this.onGameUpdate.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.handleForfeit = this.handleForfeit.bind(this);
  }

  componentDidMount = () => {
    const { id: gameId } = this.props.match.params;
    GameAPI.postGameJoin(gameId);
    socket.on(`game:${gameId}:start-game`, this.onStartGameNotifyAll);
    socket.on(`game:${gameId}:game-update`, this.onGameUpdate);
    socket.on(`game:${gameId}:game-forfeit`, this.onGameForfeit);

    GameAPI.getGame(this.props.match.params.id).then(response => {
      if (response.ok) {
        response.text().then(body => {
          body = JSON.parse(body);
          this.setState({
            userId: body.id,
            userName: body.name,
            host: body.host
          });
          GameAPI.postGameJoin(this.props.match.params.id).then(_ => {
            GameLobbyAPI.getGameLobbyInfo(this.props.match.params.id).then(
              gameInfo => {
                if ('running' === gameInfo.status) {
                  GameAPI.postGameUpdate(this.props.match.params.id);
                  this.setState({
                    startGame: true,
                    load: false
                  });
                } else {
                  this.setState({
                    load: false
                  });
                }
              }
            );
          });
        });
      } else {
        window.location = '/login';
      }
    });
  };

  onGameUpdate = data => {
    if (data) {
      this.setState({ data });
    }
  };

  onGameForfeit = message => {};

  onStartGame = _ => {
    GameAPI.postGameStartGame(this.props.match.params.id).then(_ =>
      GameAPI.postGameUpdate(this.props.match.params.id)
    );
  };

  onStartGameNotifyAll = _ => {
    this.setState({ startGame: true });
  };

  handlePromptSubmit = value => {
    GameAPI.postGameClick(this.props.match.params.id, value);
  };

  handleForfeit = _ => {
    GameAPI.postGameForfeit(this.props.match.params.id);
    window.location = '/main-lobby';
  };

  handleEndTurn = _ => {
    GameAPI.postGameEndTurn(this.props.match.params.id);
  };

  render() {
    const { id: gameId } = this.props.match.params;
    const { userId, startGame, load, host, data } = this.state;

    if (load) {
      return <div>Loading...</div>;
    } else {
      if (startGame && data) {
        return (
          <GameView
            userId={userId}
            gameId={gameId}
            data={data}
            onPromptSubmit={this.handlePromptSubmit}
            onEndTurn={this.handleEndTurn}
            onForfeit={this.handleForfeit}
          />
        );
      } else if (host) {
        return (
          <div className="container">
            <button className="button" onClick={this.onStartGame}>
              Start Game
            </button>
          </div>
        );
      } else {
        return (
          <div className="container">
            <div className="columns is-centered">
              <div className="columns is-size-2">
                <button className="button" onClick={this.onStartGame}>
                  Waiting for host to start game...
                </button>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default Game;
