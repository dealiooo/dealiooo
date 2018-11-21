import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import {
  Control,
  Field,
  Input
} from 'react-bulma-components/lib/components/form';

/*
  room_id={'mainlobby'}
  user_id={this.state.user_id}
  user_name={this.state.user_name}
  register_handler={this.state.chat_socket.register_chat_handler}
  unregister_handler={this.state.chat_socket.unregister_chat_handler}
*/
class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onMessageReceived = this.onMessageReceived.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      message: '',
      socket_message: this.props.register_handler({
        on_message_received: this.onMessageReceived
      }).message
    };
  }

  componentWillUnmount() {
    this.props.unregister_chat_handler();
  }

  onChange = evt => {
    const value =
      evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  };

  onMessageReceived = message => {
    /* no input functionality */
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.state.socket_message(
      {
        room_id: this.props.room_id,
        message: `[${this.props.user_id}]${this.props.user_name}:${
          this.state.message
        }`
      },
      error => {
        if (error) {
          console.log(error);
        } else {
          this.setState({
            message: ''
          });
        }
      }
    );
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
