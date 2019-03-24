import React, { Component } from "react";

import Button from "react-bulma-components/lib/components/button";
import {
  Control,
  Field,
  Input
} from "react-bulma-components/lib/components/form";
import Section from "react-bulma-components/lib/components/section";
import Columns from "react-bulma-components/lib/components/columns/columns";
import Container from "react-bulma-components/lib/components/container";
import Heading from "react-bulma-components/lib/components/heading";
import Box from "react-bulma-components/lib/components/box";
import Banner from "../../../components/Banner";
import { Auth } from "../../../api";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error_message: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    Auth.postLogin(this.state.email, this.state.password).then(result => {
      if (result.error) {
        this.setState({
          error_message: "Invalid email & password combination"
        });
      } else {
        window.location = "/main-lobby";
      }
    });
  };

  componentWillMount() {
    Auth.getLogin().then(response => {
      if (!response.ok) {
        window.location = "/main-lobby";
      }
    });
  }

  render() {
    const { email, password, error_message } = this.state;
    return (
      <Container fluid>
        <Banner />
        <Section>
          <Columns className="is-centered">
            <Columns.Column size={4}>
              {error_message ? (
                <div className="has-text-danger">{error_message}</div>
              ) : null}
              <Box>
                <form onSubmit={this.onSubmit}>
                  <Heading className="has-text-centered">Login</Heading>
                  <Field>
                    <Control>
                      <Input
                        name="email"
                        type="email"
                        onChange={this.onChange}
                        value={email}
                        placeholder="Email"
                      />
                    </Control>
                  </Field>
                  <Field>
                    <Control>
                      <Input
                        name="password"
                        type="password"
                        onChange={this.onChange}
                        value={password}
                        placeholder="Password"
                      />
                    </Control>
                  </Field>
                  <Field>
                    <Control>
                      <Button className="is-fullwidth">Login</Button>
                    </Control>
                  </Field>
                  <div className="has-text-right">
                    <a href="/register">Register</a>
                    &nbsp;|&nbsp;
                    <a href="/forgot-password">Forgot Password?</a>
                  </div>
                </form>
              </Box>
            </Columns.Column>
          </Columns>
        </Section>
      </Container>
    );
  }
}

export default Login;
