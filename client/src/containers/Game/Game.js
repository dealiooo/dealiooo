import React, { Component } from 'react';

import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import { toast } from 'react-toastify';

import GeneralGameInfo from './GeneralGameInfo';
import GameView from './GameView';
import GameChat from './GameChat';
import api from '../../api';

import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.onStartGame = this.onStartGame.bind(this);
    this.onGameUpdate = this.onGameUpdate.bind(this);
    this.state = {
      userId: null,
      userName: null,
      game_socket: api.socket,
      host: false,
      start_game: false,
      load: false,
      data: {},
      cardClicked: {}
    };
    let gameId = this.props.match.params.id;
    api.postGameJoin(gameId);
    api.socket.on(`game:${gameId}:start-game`, this.onStartGameNotifyAll);
    api.socket.on(`game:${gameId}:game-update`, this.onGameUpdate);
    api.socket.on(`game:${gameId}:game-forfeit`, this.onGameForfeit);

    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.handleForfeit = this.handleForfeit.bind(this);
  }

  componentDidMount = () => {
    api.getGame(this.props.match.params.id).then(response => {
      if (response.ok) {
        response.text().then(body => {
          body = JSON.parse(body);
          this.setState({
            userId: body.id,
            userName: body.name,
            host: body.host,
            load: true
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

  onGameForfeit = message => {
    toast(message);
  };

  onStartGame = _ => {
    api
      .postGameStartGame(this.props.match.params.id)
      .then(_ => api.postGameUpdate(this.props.match.params.id));
  };

  onStartGameNotifyAll = _ => {
    this.setState({ start_game: true });
  };

  onPromptOptionsSubmit = value => {
    api.postGameClick(this.props.match.params.id, value);
  };

  handleForfeit = _ => {
    api.postGameForfeit(this.props.match.params.id);
    window.location = '/main-lobby';
  };

  handleHandCardClicked = card => {
    this.setState({ cardClicked: card });
  };

  handleEndTurn = _ => {
    console.log(this.props.match.params.id);
    api.postGameEndTurn(this.props.match.params.id);
  };

  render() {
    const { start_game, load, host, data, cardClicked } = this.state;

    if (load) {
      if (start_game && data.players_info) {
        return (
          <Columns>
            <Columns.Column size={10}>
              <GameView
                userId={this.state.userId}
                general_info={data.general_info}
                players_info={data.players_info}
                onHandCardClicked={this.handleHandCardClicked}
              />
            </Columns.Column>
            <Columns.Column size={2}>
              <GeneralGameInfo
                card={cardClicked}
                general_info={data.general_info}
                prompts_info={data.prompts_info}
                onPromptOptionsSubmit={this.onPromptOptionsSubmit}
                onEndTurn={this.handleEndTurn}
                onForfeit={this.handleForfeit}
              />
              <GameChat match={this.props.match} />
            </Columns.Column>
          </Columns>
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
            <Button onClick={this.onStartGame}>
              Waiting for host to start game...
            </Button>
          </Container>
        );
      }
    } else {
      return <div>Loading</div>;
    }
  }
}

export default Game;
