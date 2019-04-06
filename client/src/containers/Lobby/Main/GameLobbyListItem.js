import React, { Component } from "react";

import { GameLobby as GameLobbyAPI } from "../../../api";

class GameLobbyListItem extends Component {
  constructor(props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
    this.onJoin = this.onJoin.bind(this);
  }

  onEnter = _ => {
    window.location = `/game-lobby/${this.props.gameId}`;
  };

  onJoin = _ => {
    GameLobbyAPI.postGameLobbyJoin(this.props.gameId).then(response => {
      if (response.result) {
        window.location = `/game-lobby/${this.props.gameId}`;
      }
    });
  };

  render = () => {
    if (this.props.gameLobby.playerList) {
      let hasJoined =
        this.props.gameLobby.playerList.filter(
          player => player.User.id === this.props.userId
        ).length === 1;
      let actionButton;
      if (hasJoined) {
        actionButton = (
          <button className="button is-fullwidth" onClick={this.onEnter}>
            Enter
          </button>
        );
      } else {
        actionButton = (
          <button className="button is-fullwidth" onClick={this.onJoin}>
            Join
          </button>
        );
      }
      return (
        <div className="columns">
          <div className="column is-4">
            #{this.props.gameLobby.id} {this.props.gameLobby.roomName}
          </div>
          <div className="column is-2">
            [{this.props.gameLobby.hostId}]{this.props.gameLobby.hostName}
          </div>
          <div className="column is-2">
            ({this.props.gameLobby.playerNum} / {this.props.gameLobby.playerCap}
            )
          </div>
          <div className="column is-2">{this.props.gameLobby.status}</div>
          <div className="column is-2">{actionButton}</div>
        </div>
      );
    }

    return (
      <div className="box">Loading Lobby #{this.props.gameLobby.id}'s info</div>
    );
  };
}

export default GameLobbyListItem;
