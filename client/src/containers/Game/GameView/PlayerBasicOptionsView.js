import React, { Component } from 'react';

class PlayerBasicOptionsView extends Component {
  render() {
    const { onEndTurn, onForfeit, contentHeight } = this.props;
    return (
      <>
        <div>
          <button
            className="button is-rounded is-primary is-fullwidth"
            onClick={onEndTurn}
          >
            End Turn
          </button>
        </div>
        <div
          style={{
            height: `${contentHeight - 30 * 2 - 12 * 4}px`
          }}
        />
        <div>
          <button
            className="button is-rounded is-danger is-fullwidth"
            onForfeit={onForfeit}
          >
            Forfeit
          </button>
        </div>
      </>
    );
  }
}

export default PlayerBasicOptionsView;
