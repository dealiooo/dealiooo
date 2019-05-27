import React, { Component } from 'react';

class PlayerStatus extends Component {
  render() {
    if (this.props.status) {
      let list = (
        <>
          {this.props.status.map((player, i) => {
            return (
              <div
                className="button is-static has-background-white"
                key={player.id}
                style={{
                  marginBottom: `10px`,
                  minWidth: `160px`
                }}
              >
                <span className="icon">
                  {0 === i ? (
                    <i
                      className="fas fa-crown"
                      style={{ color: `gold` }}
                      aria-hidden="true"
                    />
                  ) : player.ready ? (
                    <i
                      className="fas fa-check-square"
                      style={{ color: `green` }}
                      aria-hidden="true"
                    />
                  ) : (
                    <i className="fas fa-square" aria-hidden="true" />
                  )}
                </span>
                <span
                  className="has-text-weight-bold"
                  key={i}
                  style={{ marginLeft: `4px` }}
                >
                  {player.username}
                </span>
              </div>
            );
          })}
        </>
      );
      return (
        <div className="container">
          <div className="columns">
            <div className="column is-2">{list}</div>
          </div>
        </div>
      );
    }

    return <div>Loading...</div>;
  }
}

export default PlayerStatus;
