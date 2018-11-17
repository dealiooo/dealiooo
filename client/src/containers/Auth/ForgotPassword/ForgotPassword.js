import React, { Component } from 'react';
import {
  Field,
  Label,
  Control,
  Input
} from 'react-bulma-components/lib/components/form';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';

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
      <Box>
        <Section>
          <Container>
            <form onSubmit={this.onSubmit}>
              <Columns className="is-centered">
                <Columns.Column className="is-two-fifths">
                  <Field>
                    <Label>Forgot Password</Label>
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
      </Box>
    );
  }
}

export default ForgotPassword;
