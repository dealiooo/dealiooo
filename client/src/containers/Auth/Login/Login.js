import React, { Component } from 'react';

import Banner from '../../../components/Banner';
import { Auth } from '../../../api';

class Login extends Component {
  state = {
    login: '',
    password: '',
    error_message: ''
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    Auth.postLogin(this.state.login, this.state.password).then(result => {
      if (result.error) {
        this.setState({
          error_message: 'Invalid login combination'
        });
      } else {
        window.location = '/main-lobby';
      }
    });
  };

  componentWillMount() {
    Auth.getLogin().then(response => {
      if (!response.ok) {
        window.location = '/main-lobby';
      }
    });
  }

  render() {
    const { login, password, error_message } = this.state;
    return (
      <div className="container is-fluid">
        <Banner />
        <section className="section">
          <div className="columns is-centered">
            <div className="column is-6">
              {error_message ? (
                <h1 className="has-text-danger">{error_message}</h1>
              ) : null}
              <div className="box">
                <form onSubmit={this.onSubmit}>
                  <h1 className="title has-text-centered">Login</h1>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        name="login"
                        type="name"
                        onChange={this.onChange}
                        value={login}
                        placeholder="login"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        name="password"
                        type="password"
                        onChange={this.onChange}
                        value={password}
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="control">
                    <button className="button is-fullwidth">Login</button>
                  </div>
                </form>
                <div className="has-text-right" style={{ marginTop: '20px' }}>
                  <a href="/register">Register</a>
                  &nbsp;|&nbsp;
                  <a href="/forgot-password">Forgot Password?</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
