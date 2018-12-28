import React, { Component } from 'react';

import {
  Control,
  Field,
  Input
} from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container/container';
import Columns from 'react-bulma-components/lib/components/columns/columns';
import Heading from 'react-bulma-components/lib/components/heading';

import Banner from '../../../components/Banner';
import { Auth } from '../../../api';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
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
        window.location = '/main-lobby';
      }
    });
  };

  componentWillMount() {
    Auth.getRegister().then(response => {
      if (response.ok) {
        window.location = '/main-lobby';
      }
    });
  }

  render() {
    return (
      <Container className="is-fullhd">
        <Banner />
        <Section>
          <Columns className="is-centered">
            <Columns.Column size={4}>
              <Box>
                <form onSubmit={this.onSubmit}>
                  <Heading className="has-text-centered has-text-black">
                    Register
                  </Heading>
                  <Field>
                    <Control className="control-padding-vertical">
                      <Input
                        name="name"
                        type="text"
                        className="is-large"
                        onChange={this.onChange}
                        value={this.state.name}
                        placeholder="Enter a name"
                      />
                    </Control>
                  </Field>
                  <Field>
                    <Control>
                      <Input
                        name="email"
                        type="email"
                        className="is-large"
                        onChange={this.onChange}
                        value={this.state.email}
                        placeholder="Enter a email"
                      />
                    </Control>
                  </Field>
                  <Field>
                    <Control>
                      <Input
                        name="password"
                        type="password"
                        className="is-large"
                        onChange={this.onChange}
                        value={this.state.password}
                        placeholder="Enter a Password"
                      />
                    </Control>
                  </Field>
                  <Field>
                    <Control>
                      <Button className="is-fullwidth is-large">
                        Register
                      </Button>
                    </Control>
                  </Field>
                </form>
              </Box>
            </Columns.Column>
          </Columns>
        </Section>
      </Container>
    );
  }
}

export default Register;
