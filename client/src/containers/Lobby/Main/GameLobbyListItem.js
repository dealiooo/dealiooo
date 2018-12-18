import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Tag from 'react-bulma-components/lib/components/tag';

import api from '../../../api';

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
    api.postGameLobbyJoin(this.props.gameId).then(response => {
      if (response.result) {
        window.location = `/game-lobby/${this.props.gameId}`;
      }
    });
  }

  render() {
    if (this.props.gameLobby.playerList) {
      let hasJoined = false;
      let playerList = this.props.gameLobby.playerList.map((player, i) => {
        if (this.props.userId === player.id) {
          hasJoined = true;
        }
        return (
          <li key={i}>
            <Tag>{player.name}</Tag>
          </li>
        );
      });
      let actionButton;
      if (hasJoined) {
        actionButton = (
          <Button onClick={this.onEnter} className="is-large">
            Enter
          </Button>
        );
      } else {
        actionButton = (
          <Button onClick={this.onJoin} className="is-large">
            Join
          </Button>
        );
      }
      return (
        <Box>
          {this.props.gameLobby.id}
          <Columns>
            <Columns.Column>
              {this.props.gameLobby.playerNum} /{' '}
              {this.props.gameLobby.playerCap}
            </Columns.Column>
            <Columns.Column>{playerList}</Columns.Column>
            <Columns.Column>{actionButton}</Columns.Column>
          </Columns>
        </Box>
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
