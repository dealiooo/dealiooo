import React, { Component } from 'react';

class Hoverable extends Component {
  render() {
    const { className, style, data, onEnter, onExit, onClick } = this.props;
    return (
      <div
        className={className}
        style={style}
        onClick={onClick}
        onMouseEnter={() => (onEnter ? onEnter({ data }) : null)}
        onMouseLeave={() => (onExit ? onExit({ data }) : null)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Hoverable;
