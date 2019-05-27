import React, { Component } from 'react';

class GameMessageView extends Component {
  render() {
    const {
      promptPlayerUsername,
      gameMessage,
      contentHeight,
      moreThanOneOpponent
    } = this.props;

    return (
      <div
        className="box is-flex"
        style={{
          justifyContent: `${moreThanOneOpponent ? `flex-start` : `center`}`,
          minHeight: `${contentHeight}px`,
          maxHeight: `${contentHeight}px`,
          marginBottom: `12px`
        }}
      >
        <div className="columns is-vcentered">
          <div className="column">
            <h1 className="subtitle">{`${promptPlayerUsername}: ${gameMessage}`}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default GameMessageView;
