import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import routes from "./routes";
import { NotificationProvider } from "./contexts/NotificationContext";

class App extends Component {
  render() {
    return (
      <>
        <NotificationProvider>
          <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
          <ToastContainer />
        </NotificationProvider>
      </>
    );
  }
}

export default App;
