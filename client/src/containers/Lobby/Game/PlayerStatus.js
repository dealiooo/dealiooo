import React, { Component } from 'react';

class PlayerStatus extends Component {
  render() {
    if (this.props.status) {
      let list = (
        <span>
          {this.props.status.map((player, i) => {
            return (
              <div
                className="button is-static is-medium"
                style={{ marginBottom: `10px` }}
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
                <span className="is-medium " key={i}>
                  [{player.id}]{player.username}
                </span>
              </div>
            );
          })}
        </span>
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
