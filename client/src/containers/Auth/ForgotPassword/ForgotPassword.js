import React, { Component } from 'react';
import Form, {
  Field,
  Label,
  Control,
  Input
} from 'react-bulma-components/lib/components/form';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section';
import Button from 'react-bulma-components/lib/components/button';

class ForgotPassword extends Component {
  render() {
    return (
      <Box>
        <Section class="hero">header</Section>
        <div class="columns is-centered">
          <form method="post" action="">
            <div>
              <Field>
                <Label> ForgotPassword</Label>
                <Control>
                  <input id="newPass" type="text" placeholder="Email" />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Button type="primary">Submit</Button>
                </Control>
              </Field>
            </div>
          </form>
        </div>
      </Box>
    );
  }
}

export default ForgotPassword;
