import React, { Component } from 'react';

class GameWonView extends Component {
  render() {
    const { username } = this.props;

    return (
      <div>
        <section className="hero is-info is-fullheight">
          <div className="hero-body">
            <div
              className="container has-text-centered"
              style={{ marginBottom: `14vh` }}
            >
              <div style={{ marginBottom: `24px` }}>
                <h1 className="title has-text-weight-semibold">
                  🎉 {username} has won the game! 🎉
                </h1>
              </div>
              <a
                className="button global-light-hover is-info is-inverted is-rounded is-outlined is-medium"
                href="/main-lobby"
              >
                Go to Main Lobby
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default GameWonView;
