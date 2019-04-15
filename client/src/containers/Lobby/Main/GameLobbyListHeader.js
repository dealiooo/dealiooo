import React, { Component } from "react";

class GameLobbyListHeader extends Component {
  render = () => (
    <div className="columns" style={{ marginBottom: "0" }}>
      <div className="column is-4" style={{ paddingBottom: "12px" }}>
        <h1 className="title is-5">Room</h1>
      </div>
      <div className="column is-2" style={{ paddingBottom: "12px" }}>
        <h1 className="title is-5">Host</h1>
      </div>
      <div className="column is-2" style={{ paddingBottom: "12px" }}>
        <h1 className="title is-5">Capacity</h1>
      </div>
      <div className="column is-2" style={{ paddingBottom: "12px" }}>
        <h1 className="title is-5">Status</h1>
      </div>
      <div className="column is-2" style={{ paddingBottom: "12px" }} />
    </div>
  );
}

export default GameLobbyListHeader;
