import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';

import { GameLobby as GameLobbyAPI } from '../../../api';

class GameLobbyListItem extends Component {
  constructor(props) {
    super(props);
    this.onEnter = this.onEnter.bind(this);
    this.onJoin = this.onJoin.bind(this);
  }

  onEnter(_) {
    window.location = `/game-lobby/${this.props.gameId}`;
  }

  onJoin(_) {
    GameLobbyAPI.postGameLobbyJoin(this.props.gameId).then(response => {
      if (response.result) {
        window.location = `/game-lobby/${this.props.gameId}`;
      }
    });
  }

  render() {
    if (this.props.gameLobby.playerList) {
      let hasJoined = this.props.gameLobby.playerList.filter(player => player.User.id === this.props.userId).length === 1;
      let actionButton;
      if (hasJoined) {
        actionButton = (
          <Button className="is-fullwidth" onClick={this.onEnter}>
            Enter
          </Button>
        );
      } else {
        actionButton = (
          <Button className="is-fullwidth" onClick={this.onJoin}>
            Join
          </Button>
        );
      }
      return (
          <Columns>
            <Columns.Column className="is-4">#{this.props.gameLobby.id} {this.props.gameLobby.roomName}</Columns.Column>
            <Columns.Column className="is-2">[{this.props.gameLobby.hostId}]{this.props.gameLobby.hostName}</Columns.Column>
            <Columns.Column className="is-2">({this.props.gameLobby.playerNum} /{' '}{this.props.gameLobby.playerCap})</Columns.Column>
            <Columns.Column className="is-2">{this.props.gameLobby.status}</Columns.Column>
            <Columns.Column className="is-1">{actionButton}</Columns.Column>
            <Columns.Column className="is-1"></Columns.Column>
          </Columns>
      );
    }
    return (
      <Box>
        Loading Lobby #{this.props.gameLobby.id}
        's info
      </Box>
    );
  }
}

export default GameLobbyListItem;
