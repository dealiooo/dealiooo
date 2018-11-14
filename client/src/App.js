import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

class App extends Component {
  render() {
    return <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>;
  }
}

export default App;
