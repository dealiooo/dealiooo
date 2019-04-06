import React, { Component } from "react";

import Banner from "../../../components/Banner";
import { Auth } from "../../../api";

class ForgotPassword extends Component {
  state = {
    email: "",
    error_message: null
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    Auth.postForgotPassword(this.state.email).then(result => {
      if (result.error) {
        this.setState({
          error_message: "Invalid email"
        });
      } else {
        window.location = "/";
      }
    });
  };

  render() {
    const { email, error_message } = this.state;
    return (
      <div className="container is-fluid">
        <Banner />
        <section className="section">
          {error_message ? (
            <h1 className="has-text-danger">{error_message}</h1>
          ) : null}
          <form onSubmit={this.onSubmit}>
            <div className="columns is-centered">
              <div className="column is-6">
                <div className="box">
                  <div className="field">
                    <h1 className="has-text-centered title">Forgot Password</h1>
                    <div className="control">
                      <input
                        className="input"
                        name="email"
                        type="email"
                        onChange={this.onChange}
                        placeholder="Email"
                        value={email}
                      />
                    </div>
                  </div>
                  <div className="control">
                    <button className="button is-fullwidth">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default ForgotPassword;
