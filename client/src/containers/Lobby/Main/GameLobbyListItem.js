import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Tag from 'react-bulma-components/lib/components/tag';

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
      let hasJoined = false;
      let playerList = (
        <Tag.Group>
          {this.props.gameLobby.playerList.map((player, i) => {
            if (this.props.userId === player.id) {
              hasJoined = true;
            }
            return (
              <Tag>
                [{player.id}]{player.name}
              </Tag>
            );
          })}
        </Tag.Group>
      );
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
        <Box>
          <Columns>
            <Columns.Column>
              <p>
                #{this.props.gameLobby.id} {this.props.gameLobby.roomName} ({this.props.gameLobby.playerNum} /{' '}
                {this.props.gameLobby.playerCap})
              </p>
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
