import React, { Component } from "react";

import GameLobbyListHeader from "./GameLobbyListHeader";
import GameLobbyListItemContainer from "./GameLobbyListItemContainer";

class GameLobbyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      lobbies: props.gameLobbies,
      height: props.height
    };
  }

  componentWillReceiveProps = props => {
    this.setState({
      userId: props.userId,
      lobbies: props.gameLobbies,
      height: props.height
    });
  };

  render = () => (
    <div>
      <div
        className="box"
        style={{
          backgroundColor: "rgba(255, 0, 0, 0)",
          boxShadow: "0 0 0 rgba(255, 0, 0, 0), 0 0 0 0 rgba(255, 0, 0, 0)",
          paddingBottom: "0",
          margin: "0"
        }}
      >
        <GameLobbyListHeader />
      </div>
      <hr
        style={{
          marginTop: "0",
          height: "2px",
          background: "black"
        }}
      />
      <GameLobbyListItemContainer
        userId={this.state.userId}
        lobbies={this.state.lobbies}
        height={this.state.height}
      />
    </div>
  );
}

export default GameLobbyList;
