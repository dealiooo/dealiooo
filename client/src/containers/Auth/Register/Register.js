import React, { Component } from "react";

import Banner from "../../../components/Banner";
import { Auth } from "../../../api";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error_message: null
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    Auth.postRegister(
      this.state.name,
      this.state.email,
      this.state.password
    ).then(result => {
      if (result.error) {
        this.setState({ error_message: result.error.errors[0].message });
      } else {
        window.location = "/main-lobby";
      }
    });
  };

  componentWillMount() {
    Auth.getRegister().then(response => {
      if (!response.ok) {
        window.location = "/main-lobby";
      }
    });
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="container is-fluid">
        <Banner />
        <section>
          <div className="columns is-centered">
            <div className="column is-6">
              <div className="box">
                <form onSubmit={this.onSubmit}>
                  <h1 className="title has-text-centered">Register</h1>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        name="name"
                        type="name"
                        onChange={this.onChange}
                        value={name}
                        placeholder="Enter a name"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        name="email"
                        type="email"
                        onChange={this.onChange}
                        value={email}
                        placeholder="Enter a email"
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
                        placeholder="Enter a password"
                      />
                    </div>
                  </div>
                  <div className="control">
                    <button className="button is-fullwidth">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Register;
