import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Tag from 'react-bulma-components/lib/components/tag';

class GameLobbyListItem extends Component {
  render() {
    if (this.props.gameLobby.playerList) {
      let playerList = this.props.gameLobby.playerList.map((player, i) => {
        return (
          <li key={i}>
            <Tag>{player.name}</Tag>
          </li>
        );
      });
      return (
        <Box>
          {this.props.gameLobby.id}
          <Columns>
            <Columns.Column>
              {this.props.gameLobby.playerNum} /{' '}
              {this.props.gameLobby.playerCap}
            </Columns.Column>
            <Columns.Column>{playerList}</Columns.Column>
            <Columns.Column>
              <Button className="is-large">Join</Button>
            </Columns.Column>
          </Columns>
        </Box>
      );
    } else {
      return <Box>{this.props.gameLobby.id}</Box>;
    }
  }
}

export default GameLobbyListItem;
