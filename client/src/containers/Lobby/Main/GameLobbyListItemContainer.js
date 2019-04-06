import React, { Component } from "react";
import ReactDOM from "react-dom";
import PerfectScrollbar from "perfect-scrollbar";

import GameLobbyListItem from "./GameLobbyListItem";
import "perfect-scrollbar/css/perfect-scrollbar.css";

class GameLobbyMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbies: props.lobbies,
      // 52 = navBar
      // 54 = message header
      // 67.5 = message action
      // 44 = item header
      // 45 = paddings
      // 2 = smoother
      // -------------------- +
      // -261.5
      height: props.height - 264.5
    };
  }

  componentWillReceiveProps = props => {
    this.setState({
      lobbies: props.lobbies,
      height: props.height - 264.5
    });
  };

  componentDidMount = () => {
    this.ps = new PerfectScrollbar(ReactDOM.findDOMNode(this), {
      useBothWheelAxes: false,
      suppressScrollX: true
    });
  };

  componentDidUpdate = _ => this.ps.update();

  render = () => {
    let gameLobbyListItems;
    if (this.state.lobbies) {
      gameLobbyListItems = this.state.lobbies.map(lobby => {
        return (
          <div
            className="box"
            key={lobby.id}
            style={{
              backgroundColor: "rgba(255, 0, 0, 0)",
              boxShadow: "0 0 0 rgba(255, 0, 0, 0), 0 0 0 0 rgba(255, 0, 0, 0)",
              paddingTop: "0",
              paddingBottom: "0",
              margin: "0"
            }}
          >
            <GameLobbyListItem
              key={lobby.id}
              gameLobby={lobby}
              userId={this.props.userId}
              gameId={lobby.id}
            />
          </div>
        );
      });
    } else {
      gameLobbyListItems = <h1 className="title">No Rooms Avaliable.</h1>;
    }

    return (
      <div
        style={{
          minHeight: `${this.state.height}px`,
          maxHeight: `${this.state.height}px`
        }}
      >
        {gameLobbyListItems}
      </div>
    );
  };
}

export default GameLobbyMessage;
