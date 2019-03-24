import React, { Component } from 'react';

import GameLobbyListHeader from './GameLobbyListHeader';
import GameLobbyListItemContainer from './GameLobbyListItemContainer';

class GameLobbyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      lobbies: this.props.gameLobbies
    }
  }

  componentWillReceiveProps = props => {
    this.setState({
      userId: props.userId,
      lobbies: props.gameLobbies
    })
  }

  render = () => (
    <div>
      <GameLobbyListHeader />
      <hr style={{
        marginTop:'0', 
        height:'2px',
        background:'black'
      }}/>
      <GameLobbyListItemContainer
        userId={this.state.userId}
        lobbies={this.state.lobbies}
      />
  </div>
  );
}

export default GameLobbyList;
