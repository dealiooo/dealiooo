import React, { Component } from 'react';

class GameMessageView extends Component {
  render() {
    const { gameMessage } = this.props;

    return (
      <div className="box">
        <h1>Game Message</h1>
        <h1>{gameMessage}</h1>
      </div>
    );
  }
}

export default GameMessageView;
