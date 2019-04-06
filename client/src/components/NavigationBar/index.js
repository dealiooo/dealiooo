import React from "react";

import { Auth } from "./../../api";

const NavigationBar = ({ title, userName }) => {
  const logout = () => {
    Auth.postLogout().then(result => {
      if (result.error) {
        console.log("error on logout");
      }
      if (result.ok) {
        window.location = "/login";
      }
    });
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-brand">
        <div className="navbar-item" renderAs="a" href="/main-lobby">
          <img
            src={process.env.PUBLIC_URL + `/logo.png`}
            alt="logo"
            width="112"
            height="28"
          />
        </div>
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
            <span className="navbar-link">{userName}</span>
            <span className="navbar-dropdown is-right">
              <a className="navbar-item" value="item" onClick={logout}>
                Logout
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
