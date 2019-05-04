import React, { Component } from 'react';

import MakeRoomModal from './MakeRoomModal';

class GameLobbyMessageAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: this.props.roomName,
      playerCapacity: this.props.playerCapacity,
      searchRoomName: this.props.searchRoomName
    };
  }

  componentWillReceiveProps = props => {
    this.setState({
      roomName: props.roomName,
      playerCapacity: props.playerCapacity,
      searchRoomName: props.searchRoomName
    });
  };

  render = () => {
    return (
      <div className="columns">
        <div className="column is-two-thirds">
          <div className="field has-addons">
            <div className="control">
              <button className="button is-fullwidth">
                <span className="icon">
                  <i className="fa fa-search" />
                </span>
              </button>
            </div>
            <div className="control is-expanded">
              <input
                className="input"
                name="searchRoomName"
                type="text"
                onChange={this.props.onSearch}
                value={this.state.searchRoomName}
                placeholder="Find a room"
              />
            </div>
          </div>
        </div>
        <div className="column has-text-right">
          <MakeRoomModal
            roomName={this.state.roomName}
            playerCapacity={this.state.playerCapacity}
            onCreate={this.props.onCreate}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  };
}

export default GameLobbyMessageAction;
