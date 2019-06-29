import React, { useState } from 'react';

import { Auth } from './../../api';

const NavigationBar = ({ title, username }) => {
  const [isMenuActive, setMenuActive] = useState(false);

  const logout = () => {
    Auth.postLogout().then(result => {
      if (result.error) {
        console.log('error on logout');
      }
      if (result.ok) {
        window.location = '/login';
      }
    });
  };

  return (
    <nav className="navbar is-dark" role="navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/main-lobby">
          <img
            src={process.env.PUBLIC_URL + `/logo-dark.png`}
            alt="logo"
            width="112"
            height="28"
          />
        </a>
        <span
          className="navbar-burger burger"
          onClick={() => setMenuActive(!isMenuActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>
      <div className={`navbar-menu ${isMenuActive ? `is-active` : ``}`}>
        {title != null ? (
          <div className="navbar-start">
            <div className="navbar-item">
              <h1 className="title is-size-3">{title}</h1>
            </div>
          </div>
        ) : null}
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            {/* add is-arrowless if active */}
            <span className="navbar-link has-text-weight-bold is-arrowless">
              {username}
            </span>
            <div className="navbar-dropdown is-right">
              <a
                className="navbar-item"
                value="item"
                href="# "
                onClick={logout}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
