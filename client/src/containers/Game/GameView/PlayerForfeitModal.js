import React, { Component } from 'react';

class PlayerForfeitModal extends Component {
  state = {
    toggled: true
  };

  toggle = () => {
    this.setState({ toggled: !this.state.toggled });
  };

  render() {
    const { username } = this.props;

    return (
      <div>
        <div
          className={`modal has-text-centered ${
            this.state.toggled ? 'is-active' : ''
          }`}
          onClose={this.toggle}
        >
          <div className="modal-background" onClick={this.toggle} />
          <div className="modal-content has-background-info">
            <section className="section">
              <h4 class="subtitle has-text-white">
                {username} has left the game.
              </h4>
              <button
                className="button global-light-hover is-info is-inverted is-outlined"
                onClick={this.toggle}
                aria-label="close"
              >
                Close
              </button>
            </section>
          </div>
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

export default PlayerForfeitModal;
