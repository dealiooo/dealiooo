import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Tag from 'react-bulma-components/lib/components/tag';

class GameLobbyListItem extends Component {
  render() {
    let playerList = this.props.gameLobby.playerList.map((playerName, i) => {
      return (
        <li key={i}>
          <Tag>{playerName}</Tag>
        </li>
      );
    });
    return (
      <Box>
        {this.props.gameLobby.id}
        <Columns>
          <Columns.Column>
            {this.props.gameLobby.playerNum} / {this.props.gameLobby.playerCap}
          </Columns.Column>
          <Columns.Column>{playerList}</Columns.Column>
          <Columns.Column>
            <Button className="is-large">Join</Button>
          </Columns.Column>
        </Columns>
      </Box>
    );
  }
}

export default GameLobbyListItem;
