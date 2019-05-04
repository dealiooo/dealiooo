import React, { Component } from 'react';

class PlayerStatus extends Component {
  render() {
    if (this.props.status) {
      let list = (
        <span>
          {this.props.status.map((player, i) => {
            return (
              <div className="button is-static is-medium">
                <span className="icon">
                  {player.ready ? (
                    <i className="fas fa-check-square" aria-hidden="true" />
                  ) : (
                    <i className="fas fa-square" aria-hidden="true" />
                  )}
                </span>
                <span className="is-medium " key={i}>
                  [{player.id}]{player.name}
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
