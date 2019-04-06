import React, { Component } from "react";

import routes from "../../routes";

class Index extends Component {
  render() {
    return (
      <div className="container">
        <h1>Using the homepage to test the ui easier, delete later</h1>
        <ul>
          {routes.map(route => (
            <li style={{ margin: "15px" }}>
              <a className="button" href={`${route.path}`}>
                {route.component.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Index;
