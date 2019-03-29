import React, { Component } from "react";

import Columns from "react-bulma-components/lib/components/columns";
import Container from "react-bulma-components/lib/components/box";
import Button from "react-bulma-components/lib/components/button";

import GameView from "./GameView";
import { socket, Game as GameAPI } from "../../api";

import "./styles/cardColors.css";
import "./styles/gameChat.css";

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

    const { id: gameId } = this.props.match.params;
    GameAPI.postGameJoin(gameId);
    socket.on(`game:${gameId}:start-game`, this.onStartGameNotifyAll);
    socket.on(`game:${gameId}:game-update`, this.onGameUpdate);
    socket.on(`game:${gameId}:game-forfeit`, this.onGameForfeit);

    this.onStartGame = this.onStartGame.bind(this);
    this.onGameUpdate = this.onGameUpdate.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.handleForfeit = this.handleForfeit.bind(this);
  }

  componentDidMount = () => {
    GameAPI.getGame(this.props.match.params.id).then(response => {
      if (response.ok) {
        response.text().then(body => {
          body = JSON.parse(body);
          this.setState({
            userId: body.id,
            userName: body.name,
            host: body.host,
            load: false
          });
        });
      } else {
        window.location = "/login";
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
    window.location = "/main-lobby";
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
          <Container>
            <Button onClick={this.onStartGame}>Start Game</Button>
          </Container>
        );
      } else {
        return (
          <Container>
            <Columns className="is-centered">
              <Columns.Column size={2}>
                <Button onClick={this.onStartGame}>
                  Waiting for host to start game...
                </Button>
              </Columns.Column>
            </Columns>
          </Container>
        );
      }
    }
  }
}

export default Game;
