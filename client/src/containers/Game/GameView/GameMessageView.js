import React, { Component } from 'react';

class GameMessageView extends Component {
  render() {
    const { gameMessage } = this.props;

    return (
      <div className="box">
        <h1 className="subtitle">{gameMessage}</h1>
      </div>
    );
  }
}

export default GameMessageView;
