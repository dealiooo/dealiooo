import React, { Component } from 'react';

class Index extends Component {
  render() {
    return (
      <div>
        <section className="hero is-info is-fullheight">
          <div className="hero-head has-text-centered">
            <img
              src="/logo-light.png"
              style={{ paddingTop: 40 }}
              alt="logo"
              width="320"
            />
            <h1 className="subtitle is-3">dare to deal</h1>
          </div>
          <div className="hero-body">
            <div
              className="container has-text-centered"
              style={{ marginBottom: `28vh` }}
            >
              <img src="/landing.png" alt="logo" width="320" />
              <div style={{ marginBottom: `24px` }}>
                <p className="has-text-weight-semibold">Fun lovin' card game</p>
                <p>Battle your friends!</p>
                <p>Play with up to 5 people!</p>
              </div>
              <a
                className="button global-light-hover is-info is-inverted is-rounded is-outlined is-medium"
                href="/main-lobby"
              >
                Play Now
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Index;
