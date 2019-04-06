import React, { Component } from "react";

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      message: ""
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.api({ roomId: this.props.roomId, message: this.state.message });
    this.setState({ message: "" });
  };

  render() {
    const { message } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              name="message"
              type="text"
              onChange={this.onChange}
              value={message}
              placeholder="Message"
            />
          </div>
          <div className="control">
            <button className="button is-fullwidth">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

export default ChatInput;
