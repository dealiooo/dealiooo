import React, { Component } from 'react';
import Form, {
  Label,
  Control,
  Field
} from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Section from 'react-bulma-components/lib/components/section';

class NewPassword extends Component {
  render() {
    return (
      <Box>
        <Section class="hero">header</Section>

        <div class="columns is-centered">
          <form method="post" action="">
            <Field>
              <Label>New Password</Label>
              <Control>
                <input class="input" type="text" placeholder="New Password" />
              </Control>
            </Field>
            <Field>
              <Control>
                <Button>Submit</Button>
              </Control>
            </Field>
          </form>
        </div>
      </Box>
    );
  }
}

export default NewPassword;
