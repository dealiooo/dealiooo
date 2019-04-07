import React, { Component } from 'react';

class GeneralInfoView extends Component {
  render() {
    const {
      generalInfo: { timer, gameMessage, deckCount, discardCount }
    } = this.props;

    return (
      <div className="columns is-vcentered">
        <div className="column">
          <p className="subtitle">{gameMessage}</p>
          <p className="title">{timer || '0:00'}</p>
        </div>
        <div className="column has-text-centered">
          <p className="subtitle">Deck</p>
          <p className="title">{deckCount}</p>
          <p className="subtitle">Discard</p>
          <p className="title">{discardCount}</p>
        </div>
      </div>
    );
  }
}

export default GeneralInfoView;
