import React, { Component } from 'react';

class GameMessageView extends Component {
  render() {
    const { promptPlayerId, gameMessage, contentHeight } = this.props;

    return (
      <div
        className="box is-flex"
        style={{
          minHeight: `${contentHeight}px`,
          maxHeight: `${contentHeight}px`
        }}
      >
        <div className="columns is-vcentered">
          <div className="column">
            <h1 className="subtitle">{`${promptPlayerId} is: ${gameMessage}`}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default GameMessageView;
