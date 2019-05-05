import React, { Component } from 'react';

class TimerView extends Component {
  render() {
    const { tick } = this.props;

    return (
      <div className="box">
        <h1 className="subtitle">{`${tick} secs`}</h1>
      </div>
    );
  }
}

export default TimerView;
