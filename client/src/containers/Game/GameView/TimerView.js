import React, { Component } from 'react';

class TimerView extends Component {
  render() {
    const { time } = this.props;

    return (
      <div className="box">
        <h1>{time || 'Timer'}</h1>
      </div>
    );
  }
}

export default TimerView;
