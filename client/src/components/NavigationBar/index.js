import React from 'react';

import { Auth } from './../../api';

import './NavigationBar.css';

const NavigationBar = ({ title, username }) => {
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
      </div>
      <div className="navbar-menu is-active">
        {title != null ? (
          <div className="navbar-start">
            <div className="navbar-item">
              <h1 className="title is-size-3">{title}</h1>
            </div>
          </div>
        ) : null}
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <span className="navbar-link has-text-weight-bold">{username}</span>
            <div className="logout-btn navbar-dropdown has-background-dark is-right">
              <a
                className="navbar-item has-text-white"
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
