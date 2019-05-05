import React, { Component } from 'react';

class GameMessageView extends Component {
  render() {
    const { promptPlayerId, gameMessage } = this.props;

    return (
      <div className="box">
        <h1 className="subtitle">{`${promptPlayerId} is: ${gameMessage}`}</h1>
      </div>
    );
  }
}

export default GameMessageView;
