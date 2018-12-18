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

    this.state = {
      game_socket: api.socket,
      start_game: false
    };
  }

  // const register_game_handler = ({
  //   on_winner_received,
  //   on_leave_game_received,
  //   on_start_game_received,
  //   on_update_received

  // chat
  // player-action
  // start-game
  // game-update

  onWinner = () => {};
  onChat = () => {};
  onPlayerAction = () => {};
  onLeaveGame = () => {};
  onStartGame = () => {
    this.setState({ start_game: true });
  };
  onGameUpdate = () => {};

  handleForfeit = () => {};
  handleEndTurn = () => {};

  render() {
    const { start_game } = this.state;
    if (start_game) {
      return (
        <Columns>
          <Columns.Column size={10}>
            <GameView players_info={MockData.players_info} />
          </Columns.Column>
          <Columns.Column size={2}>
            <GeneralGameInfo
              general_info={MockData.general_info}
              prompts_info={MockData.prompts_info}
              onEndTurn={this.handleEndTurn}
              onForfeit={this.handleForfeit}
            />
            <GameChat match={this.props.match} />
          </Columns.Column>
        </Columns>
      );
    } else {
      return (
        <Container>
          <Button onClick={this.onStartGame}>Start Game</Button>
        </Container>
      );
    }
  }
}

export default Game;
