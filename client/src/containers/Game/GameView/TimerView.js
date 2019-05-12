import React, { Component } from 'react';

class TimerView extends Component {
  render() {
    const { tick, contentHeight } = this.props;

    return (
      <div
        className="box is-flex"
        style={{
          minHeight: `${contentHeight}px`,
          maxHeight: `${contentHeight}px`
        }}
      >
        <div className="columns is-vcentered">
          <div className="column">
            <h1 className="subtitle">{`${tick} secs`}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerView;
