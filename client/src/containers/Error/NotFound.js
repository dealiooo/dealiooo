import React, { Component } from 'react';

import './NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <>
        <section className="hero is-fullheight">
          <div class="hero-head" />
          <div class="hero-body">
            <div class="container">
              <h1 className="title x-large-f-size">404</h1>
              <h1 className="subtitle is-size-3">Page Not Found</h1>
              <a href="/main-lobby">
                <button className="button">Back to Main Lobby </button>
              </a>
            </div>
          </div>
          <div class="hero-foot" />
        </section>
      </>
    );
  }
}

export default NotFound;
