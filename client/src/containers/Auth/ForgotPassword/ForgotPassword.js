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
import api from '../../../api';

class ForgotPassword extends Component {
  state = {
    email: ''
  };

  onChange = evt => {
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  };

  onSubmit = evt => {
    // TODO
  };

  render() {
    const { email } = this.state;
    return (
      <Container className="is-fullhd">
        <Banner />
        <Section>
          <Container>
            <form onSubmit={this.onSubmit}>
              <Columns className="is-centered">
                <Columns.Column className="is-two-fifths is-4">
                  <Field>
                    <Heading className="has-text-centered has-text-black">
                      Forgot Password
                    </Heading>
                    <Control>
                      <Input
                        name="email"
                        type="email"
                        onChange={this.onChange}
                        placeholder="Email"
                        value={email}
                      />
                    </Control>
                  </Field>
                  <Field>
                    <Control className="has-text-centered">
                      <Button>Submit</Button>
                    </Control>
                  </Field>
                </Columns.Column>
              </Columns>
            </form>
          </Container>
        </Section>
      </Container>
    );
  }
}

export default ForgotPassword;
