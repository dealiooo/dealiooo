import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Form, {
  Control,
  Field,
  Input
} from 'react-bulma-components/lib/components/form';

class ChatInput extends Component {
  render() {
    return (
      <Box>
        <Field className="has-addons">
          <Control className="is-expanded">
            change input to Input once react-bulma-components is fixed
            <input type="text" placeholder="Type your message" />
          </Control>
          <Control>
            <Button className="is-info">Send</Button>
          </Control>
        </Field>
      </Box>
    );
  }
}

export default ChatInput;
