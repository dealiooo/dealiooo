import React, { Component } from "react";

import rules from "./rules";

class ModalWithToggle extends React.Component {
  state = {
    toggled: false
  };

  toggle = () => this.setState({ toggled: !this.state.toggled });

  render() {
    return (
      <div>
        <button className="button" onClick={this.toggle}>
          {this.props.toggleName}
        </button>
        <div
          class="modal"
          show={this.state.toggled}
          onClose={this.toggle}
          {...this.props.modal}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

class GameRules extends Component {
  render() {
    return (
      <ModalWithToggle
        toggleName="Game Rules"
        modal={{ closeOnBlur: true, showClose: false }}
      >
        <div className="modal-content" className="has-background-light">
          <section className="section">
            <h1 className="title has-text-centered">Game Rules</h1>
            {Object.keys(rules).map(rule => (
              <div>
                <h2 className="subtitle">{rule}</h2>
                <ul>
                  {rules[rule].map(value => (
                    <li>{value}</li>
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
