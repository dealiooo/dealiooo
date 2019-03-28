import React, { Component } from "react";
import Box from "react-bulma-components/lib/components/box";

import GameLobbyListHeader from "./GameLobbyListHeader";
import GameLobbyListItemContainer from "./GameLobbyListItemContainer";

class GameLobbyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      lobbies: this.props.gameLobbies
    };
  }

  componentWillReceiveProps = props => {
    this.setState({
      userId: props.userId,
      lobbies: props.gameLobbies
    });
  };

  render = () => (
    <div>
      <Box style={{
        backgroundColor:'rgba(255, 0, 0, 0)',
        boxShadow: '0 0 0 rgba(255, 0, 0, 0), 0 0 0 0 rgba(255, 0, 0, 0)',
        paddingBottom:'0',
        margin:'0'
      }}>
        <GameLobbyListHeader />
      </Box>
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
