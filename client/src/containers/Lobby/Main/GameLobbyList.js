import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import GameLobbyListItem from './GameLobbyListItem';

import 'perfect-scrollbar/css/perfect-scrollbar.css';
import './GameLobbyList.css';

class GameLobbyList extends Component {
  componentDidMount() {
    const ps = new PerfectScrollbar(ReactDOM.findDOMNode(this));
  }

  render() {
    let gameLobbyListItems;
    if (this.props.gameLobbies) {
      gameLobbyListItems = this.props.gameLobbies.map(gameLobby => {
        return <GameLobbyListItem key={gameLobby.id} gameLobby={gameLobby} />;
      });
    }
    return <div className="gameLobbyList">{gameLobbyListItems}</div>;
  }
}

export default GameLobbyList;
