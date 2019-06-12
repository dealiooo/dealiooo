import React, { Component } from 'react';

import rules from './rules';

class ModalWithToggle extends React.Component {
  state = {
    toggled: false
  };

  toggle = () => {
    this.setState({ toggled: !this.state.toggled });
  };

  render() {
    return (
      <div>
        <div className="has-text-centered">
          <button className="button global-light-hover" onClick={this.toggle}>
            {this.props.toggleName}
          </button>
        </div>
        <div
          className={`modal ${this.state.toggled ? 'is-active' : ''}`}
          onClose={this.toggle}
        >
          <div className="modal-background" onClick={this.toggle} />
          {this.props.children}
          <button
            className="modal-close is-large"
            onClick={this.toggle}
            aria-label="close"
          />
        </div>
      </div>
    );
  }
}

class GameRules extends Component {
  render() {
    return (
      <ModalWithToggle toggleName="Rules">
        <div className="modal-content has-background-light">
          <section className="section">
            <h1 className="title">Game Rules</h1>
            {Object.keys(rules).map(rule => (
              <div key={rule} style={{ marginTop: `20px` }}>
                <h2 className="subtitle has-text-weight-semibold">{rule}</h2>
                <ul className="list">
                  {rules[rule].map((value, i) => (
                    <li key={i} className="list-item">
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      </ModalWithToggle>
    );
  }
}

export default GameRules;
