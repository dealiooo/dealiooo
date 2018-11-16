import React, { Component } from 'react';

const AuthContext = React.createContext();

const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends Component {
  state = {
    isAuthenticated: false
  };

  async componentDidMount() {
    try {
      let response = await fetch('/is-authenticated');
      if (response.ok) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthConsumer, AuthProvider };
