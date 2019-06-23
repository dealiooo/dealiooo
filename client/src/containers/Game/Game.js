import React, { Component } from 'react';

import './styles/cardColors.css';

import GameView from './GameView/GameView';
import { socket, Game as GameAPI, GameLobby as GameLobbyAPI } from '../../api';
import GameWonView from './GameView/GameWonView';

const getAttributeValue = (event, attributeName, defaultValue) => {
  let attributeValue = event.target.getAttribute(attributeName.toLowerCase());
  if (undefined !== attributeValue) {
    return attributeValue;
  }
  return defaultValue;
};

const getCardId = event => getAttributeValue(event, 'cardid', -1);

const getOptionIndex = event => getAttributeValue(event, 'optionindex', -1);

// const getPropertyIndex = event => getAttributeValue(event, 'propertyindex', -1);

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
UserInputMap.set('picking a hand card to discard', getCardId);
UserInputMap.set('picking a field card', getCardId);
UserInputMap.set('picking a field pile', getOptionIndex);
UserInputMap.set('picking a property set to rent', getOptionIndex);
UserInputMap.set('picking a destination', getOptionIndex);
UserInputMap.set('picking a property set to rent', getOptionIndex);
UserInputMap.set('picking a destination', getOptionIndex);
UserInputMap.set('selecting a property set', getOptionIndex);
UserInputMap.set('picking a destination', getOptionIndex);
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
      data: null,
      log: [],
      playerWonUsername: undefined,
      playerForfeitUsername: undefined
    };

    this.onStartGame = this.onStartGame.bind(this);
    this.onGameUpdate = this.onGameUpdate.bind(this);
    this.onChatMessage = this.onChatMessage.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.handleForfeit = this.handleForfeit.bind(this);
    this.handleHandCardClicked = this.handleHandCardClicked.bind(this);
  }

  componentDidMount = () => {
    const { id: gameId } = this.props.match.params;
    // GameAPI.postGameJoin(gameId);
    socket.on(`game:${gameId}:start-game`, this.onStartGameNotifyAll);
    socket.on(`game:${gameId}:game-update`, this.onGameUpdate);
    socket.on(`game:${gameId}:game-forfeit`, this.onGameForfeit);
    socket.on(`game:${gameId}:chat`, this.onChatMessage);

    GameAPI.getGame(gameId).then(response => {
      if (response.ok) {
        response.text().then(body => {
          body = JSON.parse(body);
          GameAPI.postGameJoin(gameId).then(_ => {
            GameLobbyAPI.getGameLobbyInfo(gameId).then(gameInfo =>
              GameAPI.getGameChat(gameId).then(log => {
                if ('running' === gameInfo.status) {
                  GameAPI.postGameLoadGame(gameId).then(_ =>
                    this.setState({
                      userId: body.id,
                      userName: body.username,
                      host: body.host,
                      startGame: true,
                      load: false,
                      log: log.map(e => e.message)
                    })
                  );
                } else {
                  this.setState({
                    userId: body.id,
                    userName: body.username,
                    host: body.host,
                    load: false,
                    log: log.map(e => e.message)
                  });
                }
              })
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

  onChatMessage = message => {
    this.setState({ log: this.state.log.concat(message) });
  };

  onGameForfeit = ({ playerWonUsername, playerForfeitUsername }) => {
    if (playerWonUsername) {
      this.setState({
        playerWonUsername,
        playerForfeitUsername
      });
    }
  };

  onStartGame = _ => {
    GameAPI.postGameStartGame(this.props.match.params.id).then(_ =>
      GameAPI.postGameUpdate(this.props.match.params.id)
    );
  };

  onStartGameNotifyAll = _ => {
    this.setState({ startGame: true });
  };

  handlePromptOptionClicked = event => {
    event.preventDefault();
    console.log('prompt: ', this.state.data.prompts_info.promptMessage);
    console.log(
      UserInputMap.get(this.state.data.prompts_info.promptMessage)(event)
    );
    console.log(event.target);
    GameAPI.postGameClick(
      this.props.match.params.id,
      UserInputMap.get(this.state.data.prompts_info.promptMessage)(event)
    );
  };

  handleBankCardClicked = event => {
    const moneyCardId = getAttributeValue(event, 'moneycardid', -1);
    GameAPI.postGameClick(this.props.match.params.id, moneyCardId);
  };

  handleHouseCardClicked = event => {
    const houseId = getAttributeValue(event, 'houseId', -1);
    GameAPI.postGameClick(this.props.match.params.id, houseId);
  };

  handleHotelCardClicked = event => {
    const hotelId = getAttributeValue(event, 'hotelId', -1);
    GameAPI.postGameClick(this.props.match.params.id, hotelId);
  };

  handlePropertyCardClicked = event => {
    console.log('prompt: ', this.state.data.prompts_info.promptMessage);
    GameAPI.postGameClick(
      this.props.match.params.id,
      UserInputMap.get(this.state.data.prompts_info.promptMessage)(event)
    );
  };

  handleForfeit = _ => {
    GameAPI.postGameForfeit(this.props.match.params.id).then(
      _ => (window.location = '/main-lobby')
    );
  };

  handleEndTurn = _ => {
    GameAPI.postGameEndTurn(this.props.match.params.id);
  };

  /// TODO:
  handleHandCardClicked = event => {
    console.log(this.state.data.prompts_info.promptMessage);
    console.log(UserInputMap.get(this.state.data.prompts_info.promptMessage));
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
  handleCancelClicked = _ => {
    GameAPI.postGameCancel(this.props.match.params.id);
  };

  render() {
    const { id: gameId } = this.props.match.params;
    const {
      userId,
      startGame,
      load,
      host,
      data,
      log,
      playerWonUsername,
      playerForfeitUsername
    } = this.state;

    if (load) {
      return <div>Loading...</div>;
    } else {
      if (playerWonUsername) {
        return <GameWonView username={playerWonUsername} />;
      } else if (startGame && data) {
        return (
          <GameView
            userId={userId}
            gameId={gameId}
            data={data}
            log={log}
            onPropertyCardClicked={this.handlePropertyCardClicked}
            onBankCardClicked={this.handleBankCardClicked}
            onHouseCardClicked={this.handleHouseCardClicked}
            onHotelCardClicked={this.handleHotelCardClicked}
            onCancelClicked={this.handleCancelClicked}
            onHandCardClicked={this.handleHandCardClicked}
            onPromptOptionClicked={this.handlePromptOptionClicked}
            onEndTurn={this.handleEndTurn}
            onForfeit={this.handleForfeit}
            playerForfeitUsername={playerForfeitUsername}
          />
        );
      } else if (host) {
        return (
          <div
            className="has-background-info"
            style={{
              height: `100vh`,
              padding: `0px`,
              display: `flex`,
              flexWrap: `nowrap`,
              justifyContent: `center`,
              alignItems: `center`
            }}
          >
            <button
              className="button global-light-hover is-info is-inverted is-outlined is-medium"
              onClick={this.onStartGame}
            >
              Start Game
            </button>
          </div>
        );
      } else {
        return (
          <div
            className="has-background-info"
            style={{
              height: `100vh`,
              padding: `0px`,
              display: `flex`,
              flexWrap: `nowrap`,
              justifyContent: `center`,
              alignItems: `center`
            }}
          >
            <button
              className="button global-light-hover is-info is-inverted is-outlined is-medium"
              onClick={this.onStartGame}
            >
              Waiting for host to start game...
            </button>
          </div>
        );
      }
    }
  }
}

export default Game;
