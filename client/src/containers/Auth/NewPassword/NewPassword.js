import React, { Component } from "react";

import Banner from "../../../components/Banner";
import { Auth } from "../../../api";

class NewPassword extends Component {
  state = {
    isLoading: false,
    password: "",
    error_message: null
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    const { sid } = this.props.match.params;

    Auth.getNewPassword(sid).then(result => {
      if (!result.ok) {
        window.location = "/login";
      }

      this.setState({ isLoading: false });
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { sid } = this.props.match.params;
    Auth.postNewPassword(sid, this.state.password).then(result => {
      if (!result.ok) {
        this.setState({ error_message: "Something went wrong" });
      } else {
        window.location = "/";
      }
    });
  };

  render() {
    const { isLoading, password, error_message } = this.state;

    if (isLoading) {
      return <>...Loading</>;
    } else {
      return (
        <div className="container is-fluid">
          <Banner />
          <div>
            {error_message ? (
              <h1 className="has-text-danger">{error_message}</h1>
            ) : null}
            <div className="columns is-centered">
              <div className="column is-6">
                <div className="box">
                  <form onSubmit={this.onSubmit}>
                    <div className="field">
                      <h1 className="title has-text-centered has-text-black">
                        New Password
                      </h1>
                      <div className="control">
                        <input
                          className="input"
                          name="password"
                          type="password"
                          onChange={this.onChange}
                          value={password}
                          placeholder="New Password"
                        />
                      </div>
                    </div>
                    <div className="control">
                      <button className="button is-fullwidth">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default NewPassword;
