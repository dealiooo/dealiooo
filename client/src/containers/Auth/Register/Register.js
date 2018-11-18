import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import {
  Control,
  Field,
  Input
} from 'react-bulma-components/lib/components/form';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    // fetch here
  };

  render() {
    return (
      <Box>
        <form onSubmit={this.onSubmit}>
          <Field>
            <Control>
              <Input
                name="name"
                type="text"
                onChange={this.onChange}
                value={this.state.name}
                placeholder="Type your in-game name"
              />
            </Control>
          </Field>
          <Field>
            <Control>
              <Input
                name="email"
                type="email"
                onChange={this.onChange}
                value={this.state.email}
                placeholder="Type your email"
              />
            </Control>
          </Field>
          <Field>
            <Control>
              <Input
                name="password"
                type="password"
                onChange={this.onChange}
                value={this.state.password}
                placeholder="Type your password"
              />
            </Control>
          </Field>
          <Field>
            <Control>
              <Button className="is-info">Send</Button>
            </Control>
          </Field>
        </form>
      </Box>
    );
  }
}

export default Register;
