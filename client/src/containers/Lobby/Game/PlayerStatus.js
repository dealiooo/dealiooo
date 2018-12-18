import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Columns from 'react-bulma-components/lib/components/columns';
import Tag from 'react-bulma-components/lib/components/tag';

class PlayerStatus extends Component {
  render() {
    if (this.props.status) {
      let nameList = this.props.status.map((player, i) => {
        return (
          <Tag key={i}>
            [{player.id}]{player.name}
          </Tag>
        );
      });
      let readyList = this.props.status.map((player, i) => {
        if (player.ready) {
          return <Tag key={i}>Ready</Tag>;
        } else {
          return <Tag key={i}>Not Ready</Tag>;
        }
      });
      return (
        <Box>
          <Columns>
            <Columns.Column>{nameList}</Columns.Column>
            <Columns.Column>{readyList}</Columns.Column>
          </Columns>
        </Box>
      );
    }
    return <Box>Loading Player Status...</Box>;
  }
}

export default PlayerStatus;
