import React, { Component } from 'react';

import './GameLobbyListItem.css';

class GameLobbyListItem extends Component {
  render() {
    let playerList = this.props.gameLobby.playerList.map(playerName => {
      return <li>{playerName}</li>;
    });
    return (
      <div className="gameLobbyListItem">
        <div>Game Lobby - {this.props.gameLobby.id}</div>
        <div>
          <div className="lobbyCapacity">
            {this.props.gameLobby.playerNum} / {this.props.gameLobby.playerCap}
          </div>
          <button className="joinButton">Join</button>
          <div className="playerList">{playerList}</div>
        </div>
      </div>
    );
  }
}

export default GameLobbyListItem;
