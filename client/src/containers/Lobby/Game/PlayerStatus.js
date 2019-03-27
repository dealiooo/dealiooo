import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Columns from 'react-bulma-components/lib/components/columns';
import Tag from 'react-bulma-components/lib/components/tag';

class PlayerStatus extends Component {
  render() {
    if (this.props.status) {
      let list = (
        <Tag.Group>
          {this.props.status.map((player, i) => {
            return (
              <Tag key={i}>
                [{player.id}]{player.name} -{' '}
                {player.ready ? 'Ready' : 'Not Ready'}
              </Tag>
            );
          })}
        </Tag.Group>
      );
      return (
        <Box>
          <Columns>
            <Columns.Column>{list}</Columns.Column>
          </Columns>
        </Box>
      );
    }
    return <Box>Loading Player Status...</Box>;
  }
}

export default PlayerStatus;
