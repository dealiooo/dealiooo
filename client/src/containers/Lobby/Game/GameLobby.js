import React, { Component } from 'react';

import './GameLobby.css';

class MainLobby extends Component {
  render() {
    let gameLobbyName;
    if (this.props.gameLobby) {
      gameLobbyName = this.props.gameLobby.id;
    } else {
      gameLobbyName = 'Not Registered';
    }
    return (
      <div>
        Game Lobby - {gameLobbyName}
        <div className="chatPlaceholder" />
        <div className="buttons">
          <button className="startButton">Start</button>
          <button className="exitButton">Exit</button>
          <button className="readyButton">Ready</button>
        </div>
      </div>
    );
  }
}

export default MainLobby;
