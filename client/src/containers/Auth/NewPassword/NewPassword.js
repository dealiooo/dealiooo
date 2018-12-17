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
      <Container className="is-fullhd">
        <Banner />
        <Section>
          <Container>
            <Columns className="is-centered">
              <Columns.Column className="is-two-fifths">
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
      </Container>
    );
  }
}

export default NewPassword;
