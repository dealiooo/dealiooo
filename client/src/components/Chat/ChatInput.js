import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import {
  Control,
  Field,
  Input
} from 'react-bulma-components/lib/components/form';

class ChatInput extends Component {
  state = {
    message: ''
  };

  onChange = evt => {
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  };

  onSubmit = evt => {
    evt.preventDefault();
    // TODO: fetch here
    evt.target.elements.message.value = '';
  };

  render() {
    const { message } = this.state;
    return (
      <Box>
        <form onSubmit={this.onSubmit}>
          <Field className="has-addons">
            <Control className="is-expanded">
              <Input
                name="message"
                type="text"
                onChange={this.onChange}
                value={message}
                placeholder="Type your message"
              />
            </Control>
            <Control>
              <Button className="is-info">Send</Button>
            </Control>
          </Field>
        </form>
      </Box>
    );
  }
}

export default ChatInput;
