import React, { Component } from 'react';
import { toast } from 'react-toastify';

const NotificationContext = React.createContext();
const NotificationConsumer = NotificationContext.Consumer;

class NotificationProvider extends Component {
  state = {
    notify: message => toast(message)
  };

  render() {
    return (
      <NotificationContext.Provider value={this.state}>
        {this.props.children}
      </NotificationContext.Provider>
    );
  }
}

export { NotificationConsumer, NotificationProvider };
