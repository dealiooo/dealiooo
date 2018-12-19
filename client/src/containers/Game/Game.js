import React, { Component } from 'react';

import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';

import GeneralGameInfo from './GeneralGameInfo';
import GameView from './GameView';
import GameChat from './GameChat';
import api from '../../api';

import { MockData } from './MockData';
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
      data: {}
    };
    let gameId = this.props.match.params.id;
    api.postGameJoin(gameId);
    api.socket.on(`game:${gameId}:start-game`, this.onStartGameNotifyAll);
    api.socket.on(`game:${gameId}:game-update`, this.onGameUpdate);
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
    console.log('DATA', data);
    if (data) {
      this.setState({ data });
    }
  };

  onStartGame = _ => {
    api
      .postGameStartGame(this.props.match.params.id)
      .then(_ => api.postGameUpdate(this.props.match.params.id));
  };

  onStartGameNotifyAll = _ => {
    this.setState({ start_game: true });
  };

  handleForfeit = _ => {
    api.postGameForfeit(this.props.match.params.id);
  };

  handleEndTurn = _ => {
    api.postGameEndTurn(this.props.match.params.id);
  };

  render() {
    const { start_game, load, host, data } = this.state;

    if (load) {
      if (start_game && data.players_info) {
        return (
          <Columns>
            <Columns.Column size={10}>
              <GameView
                userId={this.state.userId}
                general_info={data.general_info}
                players_info={data.players_info}
              />
            </Columns.Column>
            <Columns.Column size={2}>
              <GeneralGameInfo
                general_info={data.general_info}
                prompts_info={data.prompts_info}
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
