import React, { Component } from "react";

class PlayerStatus extends Component {
  render() {
    if (this.props.status) {
      let list = (
        <spn className="tags">
          {this.props.status.map((player, i) => {
            return (
              <span
                className="tag is-medium has-background-grey-light has-text-white"
                key={i}
              >
                [{player.id}]{player.name} -{" "}
                {player.ready ? "Ready" : "Not Ready"}
              </span>
            );
          })}
        </spn>
      );
      return (
        <div className="container">
          <div className="columns">
            <div className="column">{list}</div>
          </div>
        </div>
      );
    }

    return <div>Loading...</div>;
  }
}

export default PlayerStatus;
