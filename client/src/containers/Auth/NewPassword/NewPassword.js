import React, { Component } from 'react';
import {
  Field,
  Control,
  Input
} from 'react-bulma-components/lib/components/form';
import Section from 'react-bulma-components/lib/components/section';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Columns from 'react-bulma-components/lib/components/columns';
import Container from 'react-bulma-components/lib/components/container';
import Banner from '../../../components/Banner';
import Heading from 'react-bulma-components/lib/components/heading';

class NewPassword extends Component {
  state = {
    password: '',
    error_message: null
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    // TODO
  };

  render() {
    const { password } = this.state;
    return (
      <Container fluid>
        <Banner />
        <Section>
          <Columns className="is-centered">
            <Columns.Column size={4}>
              <Box>
                <form onSubmit={this.onSubmit}>
                  <Field>
                    <Heading className="has-text-centered has-text-black">
                      New Password
                    </Heading>
                    <Control>
                      <Input
                        name="password"
                        type="password"
                        onChange={this.onChange}
                        value={password}
                        placeholder="New Password"
                      />
                    </Control>
                  </Field>
                  <Field>
                    <Control>
                      <Button className="is-fullwidth">Submit</Button>
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

export default NewPassword;
