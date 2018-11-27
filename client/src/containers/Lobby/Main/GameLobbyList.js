import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import GameLobbyListItem from './GameLobbyListItem';

import Box from 'react-bulma-components/lib/components/box';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

class GameLobbyList extends Component {
  componentDidMount() {
    this.ps = new PerfectScrollbar(ReactDOM.findDOMNode(this));
  }

  componentDidUpdate(prevProps) {
    this.ps.update();
  }

  render() {
    let gameLobbyListItems;
    if (this.props.gameLobbies) {
      gameLobbyListItems = this.props.gameLobbies.map(gameLobby => {
        return (
          <GameLobbyListItem
            key={gameLobby.id}
            gameLobby={gameLobby}
            user_id={this.props.user_id}
            game_id={gameLobby.id}
            socket_join={this.props.socket_join_game}
          />
        );
      });
    }
    return <Box>{gameLobbyListItems}</Box>;
  }
}

export default GameLobbyList;
