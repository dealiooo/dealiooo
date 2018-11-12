import React, { Component } from 'react';
import GameLobbyList from './GameLobbyList';

import './MainLobby.css';

class MainLobby extends Component {
  render() {
    return (
      <div>
        <div className="gameLobbies">
          <GameLobbyList
            key="gameLobbies"
            gameLobbies={this.props.gameLobbies}
          />
          <button className="createButton">Create</button>
        </div>
        <div className="chatPlaceholder" />
      </div>
    );
  }
}

export default MainLobby;
