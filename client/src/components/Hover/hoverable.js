import React, { Component } from 'react';

class Hoverable extends Component {
  render() {
    const { data, onEnter, onExit } = this.props;
    return (
      <div
        onMouseEnter={() => (onEnter ? onEnter({ data }) : null)}
        onMouseLeave={() => (onExit ? onExit({ data }) : null)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Hoverable;
