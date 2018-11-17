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

class NewPassword extends Component {
  state = {
    password: ''
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
    const { password } = this.state;
    return (
      <Box>
        <Section>
          <Container>
            <Columns className="is-centered">
              <Columns.Column className="is-two-fifths">
                <form onSubmit={this.onSubmit}>
                  <Field>
                    <Label>New Password</Label>
                    <Control>
                      <Input
                        name="password"
                        type="password"
                        onChange={this.onChange}
                        value={password}
                      />
                    </Control>
                  </Field>
                  <Field>
                    <Control className="has-text-centered">
                      <Button>Submit</Button>
                    </Control>
                  </Field>
                </form>
              </Columns.Column>
            </Columns>
          </Container>
        </Section>
      </Box>
    );
  }
}

export default NewPassword;
