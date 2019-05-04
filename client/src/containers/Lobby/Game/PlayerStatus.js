import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

class PlayerStatus extends Component {
  render() {
    if (this.props.status) {
      let list = (
        <spn>
          {this.props.status.map((player, i) => {
            return (
              <div className="button is-static is-medium">
                <span className="icon">
                  {player.ready ? (
                    <FontAwesomeIcon icon={faCheckSquare} />
                  ) : (
                    <FontAwesomeIcon icon={faSquare} />
                  )}
                </span>
                <span className="is-medium " key={i}>
                  [{player.id}]{player.name}
                </span>
              </div>
            );
          })}
        </spn>
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
