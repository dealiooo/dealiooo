import React, { Component } from 'react';
import Columns from 'react-bulma-components/lib/components/columns';

class GameLobbyListHeader extends Component {
  render = () => (
    <Columns style={{marginBottom:'0'}}>
      <Columns.Column className="is-4" style={{paddingBottom:'0'}}>Room</Columns.Column>
      <Columns.Column className="is-2" style={{paddingBottom:'0'}}>Host</Columns.Column>
      <Columns.Column className="is-2" style={{paddingBottom:'0'}}>Capacity</Columns.Column>
      <Columns.Column className="is-2" style={{paddingBottom:'0'}}>Status</Columns.Column>
      <Columns.Column className="is-2" style={{paddingBottom:'0'}}></Columns.Column>
    </Columns>
  );
}

export default GameLobbyListHeader;
