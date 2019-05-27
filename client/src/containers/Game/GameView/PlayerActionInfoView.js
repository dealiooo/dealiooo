import React, { Component } from 'react';

class PlayerActionInfoView extends Component {
  render() {
    const {
      tick,
      currentPlayerUsername,
      cardsPlayed,
      contentHeight
    } = this.props;

    return (
      <div
        className="box is-flex"
        style={{
          minHeight: `${contentHeight}px`,
          maxHeight: `${contentHeight}px`
        }}
      >
        <div
          className="columns is-vcentered has-text-centered"
          style={{ width: `100%` }}
        >
          <div className="column">
            <span className="icon is-small">
              <i
                className="fas fa-clock"
                style={{ color: `gold` }}
                aria-hidden="true"
              />
            </span>
            <span
              className="subtitle"
              style={{
                marginBottom: 0
              }}
            >
              {` ${tick} `}
            </span>
            <span style={{ fontSize: `14px` }}>secs</span>
          </div>
          <div className="column" style={{}}>
            <h1
              className="subtitle has-text-weight-bold"
              style={{
                marginBottom: 0
              }}
            >{`Current Turn: `}</h1>
            <h3>{currentPlayerUsername}</h3>
          </div>
          <div className="column" style={{}}>
            <h1
              className="subtitle has-text-weight-bold"
              style={{
                marginBottom: 0
              }}
            >{`Cards Played: `}</h1>
            <h3>{cardsPlayed}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerActionInfoView;
