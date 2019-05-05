import React, { Component } from 'react';

import './styles/cardColors.css';

import GameView from './GameView/GameView';
import { socket, Game as GameAPI, GameLobby as GameLobbyAPI } from '../../api';

const getAttributeValue = (event, attributeName, defaultValue) => {
  let attributeValue = event.target.getAttribute(attributeName);
  if (undefined != attributeValue) {
    return attributeValue;
  }
  return defaultValue;
};

const getCardId = event => getAttributeValue(event, 'cardid', -1);

const getOptionIndex = event => getAttributeValue(event, 'optionindex', -1);

const getPropertyIndex = event => getAttributeValue(event, 'propertyindex', -1);

const UserInputMap = new Map();
UserInputMap.set('picking a target player', getOptionIndex);
UserInputMap.set('picking a color', getOptionIndex);
UserInputMap.set('do you want to play a hand card?', getOptionIndex);
UserInputMap.set('do you want to move a card around?', getOptionIndex);
UserInputMap.set('do you want to play just say no?', getOptionIndex);
UserInputMap.set('play as money or action?', getOptionIndex);
UserInputMap.set('play as money or action?', getOptionIndex);
UserInputMap.set('play as money or property?', getOptionIndex);
UserInputMap.set('play as money or action?', getOptionIndex);
UserInputMap.set('picking a hand card', getCardId);
UserInputMap.set('picking a field card', getCardId);
UserInputMap.set('picking a field pile', getPropertyIndex);
UserInputMap.set('picking a property set to rent', getPropertyIndex);
UserInputMap.set('picking a destination', getPropertyIndex);
UserInputMap.set('picking a property set to rent', getPropertyIndex);
UserInputMap.set('picking a destination', getPropertyIndex);
UserInputMap.set('selecting a property set', getPropertyIndex);
UserInputMap.set('picking a destination', getPropertyIndex);
UserInputMap.set('waiting for player action', getOptionIndex);

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
    this.handleHandCardClicked = this.handleHandCardClicked.bind(this);
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
                  GameAPI.postGameLoadGame(this.props.match.params.id);
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

  handlePromptSubmit = event => {
    event.preventDefault();
    console.log(
      UserInputMap.get(this.state.data.prompts_info.promptMessage)(event)
    );
    console.log(event.target);
    GameAPI.postGameClick(
      this.props.match.params.id,
      UserInputMap.get(this.state.data.prompts_info.promptMessage)(event)
    );
  };

  handlePropertyCardClicked = event => {
    GameAPI.postGameClick(
      this.props.match.params.id,
      UserInputMap.get(this.state.data.prompts_info.promptMessage)(event)
    );
  };

  handleForfeit = _ => {
    GameAPI.postGameForfeit(this.props.match.params.id);
    window.location = '/main-lobby';
  };

  handleEndTurn = _ => {
    GameAPI.postGameEndTurn(this.props.match.params.id);
  };

  /// TODO:
  handleHandCardClicked = event => {
    console.log(
      UserInputMap.get(this.state.data.prompts_info.promptMessage)(event)
    );
    console.log(event.target);
    GameAPI.postGameClick(
      this.props.match.params.id,
      UserInputMap.get(this.state.data.prompts_info.promptMessage)(event)
    );
  };

  /// TODO:
  handleCancelClicked = event => {};

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
            onPropertyCardClicked={this.handlePropertyCardClicked}
            onCancelClicked={this.handleCancelClicked}
            onHandCardClicked={this.handleHandCardClicked}
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
