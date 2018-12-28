import React, { Component } from 'react';
import {
  Field,
  Control,
  Input
} from 'react-bulma-components/lib/components/form';
import Section from 'react-bulma-components/lib/components/section';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';
import Banner from '../../../components/Banner';
import Heading from 'react-bulma-components/lib/components/heading';
import Box from 'react-bulma-components/lib/components/box';
import { Auth } from '../../../api';

class ForgotPassword extends Component {
  state = {
    email: '',
    error_message: null
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = evt => {
    evt.preventDefault();
    Auth.postForgotPassword(this.state.email).then(result => {
      if (result.error) {
        this.setState({
          error_message: 'Invalid email'
        });
      } else {
        window.location = '/';
      }
    });
  };

  render() {
    const { email, error_message } = this.state;
    return (
      <Container fluid>
        <Banner />
        <Section>
          {error_message ? (
            <div className="has-text-danger">{error_message}</div>
          ) : null}
          <form onSubmit={this.onSubmit}>
            <Columns className="is-centered">
              <Columns.Column size={4}>
                <Box>
                  <Field>
                    <Heading className="has-text-centered has-text-black">
                      Forgot Password
                    </Heading>
                    <Control>
                      <Input
                        name="email"
                        type="email"
                        className="is-large"
                        onChange={this.onChange}
                        placeholder="Email"
                        value={email}
                      />
                    </Control>
                  </Field>
                  <Field>
                    <Control>
                      <Button className="is-fullwidth is-large">Submit</Button>
                    </Control>
                  </Field>
                </Box>
              </Columns.Column>
            </Columns>
          </form>
        </Section>
      </Container>
    );
  }
}

export default ForgotPassword;
