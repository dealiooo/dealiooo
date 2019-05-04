import React, { Component } from 'react';

class PlayerBasicOptionsView extends Component {
  render() {
    const { onEndTurn, onForfeit } = this.props;
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
