import React, { Component } from "react";
import Message from "react-bulma-components/lib/components/message";

import GameLobbyList from "./GameLobbyList";
import GameLobbyMessageAction from "./GameLobbyMessageAction";

class GameLobbyMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      gameLobbies: props.gameLobbies,
      roomName: props.roomName,
      playerCapacity: props.playerCapacity,
      searchRoomName: "",
      height: props.height
    };
  }

  componentWillReceiveProps = props => {
    this.setState({
      userId: props.userId,
      gameLobbies: props.gameLobbies,
      roomName: props.roomName,
      playerCapacity: props.playerCapacity,
      height: props.height
    });
  };

  onSearch = event => {
    this.setState({
      [event.target.name]: event.target.value,
      gameLobbies: this.filterCase(this.props.gameLobbies, event.target.value)
    });
  };

  filterCase = (lobbies, filter) => {
    if ("" === filter) {
      return lobbies;
    } else {
      return lobbies.filter(
        lobby =>
          lobby.roomName.includes(filter) || lobby.hostName.includes(filter)
      );
    }
  };

  render = () => (
    <Message className="is-dark">
      <Message.Header>
        <p />
        <p className="is-size-4">Main Lobby</p>
        <p />
      </Message.Header>
      <Message.Body>
        <GameLobbyMessageAction
          roomName={this.state.roomName}
          playerCapacity={this.state.playerCapacity}
          searchRoomName={this.state.searchRoomName}
          onCreate={this.props.onCreate}
          onChange={this.props.onChange}
          onSearch={this.onSearch}
        />
        <GameLobbyList
          userId={this.state.userId}
          gameLobbies={this.state.gameLobbies}
          height={this.state.height}
        />
      </Message.Body>
    </Message>
  );
}

export default GameLobbyMessage;
