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
      <Box>
        <GameLobbyListHeader />
      </Box>
      <GameLobbyListItemContainer
        userId={this.state.userId}
        lobbies={this.state.lobbies}
      />
    </div>
  );
}

export default GameLobbyList;
