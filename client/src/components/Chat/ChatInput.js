import React, { Component } from "react";

import Button from "react-bulma-components/lib/components/button";
import {
  Control,
  Field,
  Input
} from "react-bulma-components/lib/components/form";

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      message: ""
    };
  }

  onChange = evt => {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.props.api({ roomId: this.props.roomId, message: this.state.message });
    this.setState({ message: "" });
  };

  render() {
    const { message } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Field className="has-addons">
          <Control className="is-expanded">
            <Input
              name="message"
              type="text"
              onChange={this.onChange}
              value={message}
              placeholder="Message"
            />
          </Control>
          <Control>
            <Button className="is-fullwidth">Submit</Button>
          </Control>
        </Field>
      </form>
    );
  }
}

export default ChatInput;
