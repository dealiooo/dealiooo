import React, { Component } from 'react';

class GameLog extends Component {
  render() {
    const { gameLog = [] } = this.props;

    return (
      <div className="box">
        <h1>Game Log</h1>
        <div className="content">
          <ul>
            {gameLog.map(line => (
              <li>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default GameLog;
