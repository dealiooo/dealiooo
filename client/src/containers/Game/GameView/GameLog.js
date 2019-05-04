import React, { Component } from 'react';

class GameLog extends Component {
  render() {
    const { gameLog = [], contentHeight } = this.props;

    return (
      <div
        className="box"
        style={{
          position: 'relative',
          minHeight: `${contentHeight - 20 * 2}px`,
          maxHeight: `${contentHeight - 20 * 2}px`,
          overflow: 'auto'
        }}
      >
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
